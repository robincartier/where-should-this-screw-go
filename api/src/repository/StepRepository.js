const StepRepository = require("../domain/step/StepRepository");
const StepEntity = require("../domain/step/StepEntity");

class StepDBAdapter extends StepRepository {
    constructor(db) {
        super();

        this.db = db;
    }

    async addStep(step) {
        const dbo = await this.addStepToDB(step);

        const id = StepEntity.fromDboAdd(dbo);
        return id;
    }

    async getStep(id) {
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

module.exports = StepDBAdapter;
