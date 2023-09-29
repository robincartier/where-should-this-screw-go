import StepRepository from "../domain/step/StepRepository";
import StepEntity from "../domain/step/StepEntity";

class StepDBRepository implements StepRepository {

    db;
    
    constructor(db) {
        this.db = db;
    }
    
    async addStep(step: StepEntity): Promise<number> {
        const dbo = await this.addStepToDB(step);

        const id = StepEntity.fromDboAdd(dbo);
        return id;
    }

    async getStep(id: number): Promise<StepEntity> {
        const dbo = await this.getStepFromDB(id);

        return StepEntity.fromDboGet(dbo);
    }

    addStepToDB(dbo) {
        return this.db.query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2) RETURNING id",
            [dbo.tags, dbo.image]
        );
    }

    getStepFromDB(id) {
        return this.db.query(
            "SELECT * FROM steps WHERE id = $1",
            [id]
        );
    }
}

export default StepDBRepository;
