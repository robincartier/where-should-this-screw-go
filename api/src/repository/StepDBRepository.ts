import StepRepository from "../domain/step/StepRepository";
import StepEntity from "../domain/step/StepEntity";
import { dbType } from "../db";
class StepDBRepository implements StepRepository {

    db;
    
    constructor(db: dbType) {
        this.db = db;
    }
    
    async addStep(step: StepEntity): Promise<number> {
        const dbo = await this.addStepToDB(step);

        const id = StepEntity.fromDboAdd(dbo);
        return id;
    }

    async getStep(id: number): Promise<StepEntity> {
        const dbo: DboGetStep = await this.getStepFromDB(id);

        return StepEntity.fromDboGet(dbo);
    }

    addStepToDB(step: StepEntity) {
        return this.db.query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2) RETURNING id",
            [step.tags, step.image]
        );
    }

    getStepFromDB(id: number) {
        return this.db.query(
            "SELECT * FROM steps WHERE id = $1",
            [id]
        );
    }
}

export default StepDBRepository;
