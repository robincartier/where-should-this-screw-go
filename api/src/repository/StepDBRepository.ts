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
        return this.transaction<number>(async (client: ClientBase) => {
            try {
                const dboAddStep = await client.query(
                    "INSERT INTO Steps(image) VALUES ($1) RETURNING id",
                    [step.image]
                );
                const stepId = dboAddStep.rows[0].id;
                
                const dboTags = step.tags;
                const dboAddTags = await client.query(format(
                    `with i as (
                        INSERT INTO tags(tag) VALUES %L ON CONFLICT (tag) DO NOTHING RETURNING id
                    )
                    SELECT id FROM i
                    UNION ALL
                    SELECT id FROM tags WHERE tag in (%L)
                    ORDER BY id`, 
                    dboTags.map(tag => [tag]), dboTags), 
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

    async getStep(stepId: number): Promise<StepEntity> {
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

    async getSteps() {
        const dboSteps = await this.query(
            "SELECT * FROM Steps",
            []
        );

        const stepEntities = StepEntity.fromDboGet(dboSteps);
        
        // TODO find a cleaner way
        const tagsByStepDbo = await this.query(
            `SELECT Tags.tag as tag, StepTags.stepId as stepId 
            FROM Tags, StepTags 
            WHERE StepTags.tagId = Tags.id`,
            []
        );

        tagsByStepDbo.rows.forEach(row => {
            const stepEntity = stepEntities.find(entity => entity.id === row.stepid);
            if (!stepEntity) return;
            
            stepEntity.appendTags(row.tag);
        });

        return stepEntities;
    }
}

export default StepDBRepository;
