import { ClientBase } from "pg";
import format from "pg-format";

import StepRepository from "../domain/step/StepRepository";
import StepEntity from "../domain/step/StepEntity";
import { queryType, transactionType } from "../db";
class StepDBRepository implements StepRepository {

    query;
    transaction;
    
    constructor(query: queryType, transaction: transactionType) {
        this.query = query;
        this.transaction = transaction;
    }
    
    async addStep(step: StepEntity): Promise<number> {
        const id = await this.addStepToDB(step) as number;

        return id;
    }

    async getStep(id: number): Promise<StepEntity> {
        const stepEntity = await this.getStepFromDB(id);

        return stepEntity;
    }

    async getSteps(): Promise<StepEntity[]> {
        const dbo: DboGetStep = await this.getStepsFromDB();

        return StepEntity.fromDboGet(dbo);
    }

    async addStepToDB(step: StepEntity) {

        return this.transaction(async (client: ClientBase) => {
            try {
                const dboAddStep = await client.query(
                    "INSERT INTO Steps(image) VALUES ($1) RETURNING id",
                    [step.image]
                );
                const stepId = dboAddStep.rows[0].id;
                
                const dboTags = this.parseInputTags(step.tags);
                const dboAddTags = await client.query(format(
                    "INSERT INTO tags(tag) VALUES %L RETURNING id", 
                    dboTags), 
                []);
                const tagIds = dboAddTags.rows.map(row => row.id);
            
                const dboStepTagIds = tagIds.map(tagId => ([stepId, tagId]));
                await client.query(format(
                    "INSERT INTO StepTags(stepId, tagId) VALUES %L", 
                    dboStepTagIds), 
                []);

                return stepId;
            } catch (e) {
                console.error(e);
                throw e;
            }
        });

    }

    parseInputTags(inputTags: string): string[][] {
        return inputTags
            .replace("/ +/g", " ")
            .toLowerCase()
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => [tag]);
    }

    async getStepFromDB(stepId: number) {
        const dboStep = await this.query(
            "SELECT * FROM Steps WHERE id = $1",
            [stepId]
        );
        
        const stepEntity = StepEntity.fromDboGet(dboStep)[0];

        const tagsDbo = await this.query(
            `SELECT Tags.tag as tag
            FROM Tags
            JOIN StepTags ON StepTags.tagId = Tags.id
            WHERE StepTags.stepId = $1`,
            [stepId]
        );

        stepEntity.setTagsFromDbo(tagsDbo);

        return stepEntity;
    }

    getStepsFromDB() {
        return this.query(
            "SELECT * FROM Steps",
            []
        );
    }
}

export default StepDBRepository;
