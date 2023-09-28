const StepDataInterface = require("./StepDataInterface");
const Step = require("./Step");

class StepDBAdapter extends StepDataInterface {
    constructor(db) {
        super();

        this.db = db;
    }

    async addStep(step) {
        try {
            const response = await this.addStepTODB(step.tags, step.image);

            const id = response.rows[0].id;
            return id;

        } catch (err) {
            console.error(err);

            return -1;
        }
    }

    async getStep(id) {
        try {
            const response = await this.getStepFromDB(id);

            response.rows[0].image = response.rows[0].image.toString("base64");

            return new Step({
                image: response.rows[0].image.toString("base64"),
                tags: response.rows[0].tags,
                id: response.rows[0].id
            });
        } catch (err) {
            console.error(err);

            return null;
        }
    }

    addStepTODB(tags, image) {
        return this.db.query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2) RETURNING id",
            [tags, image]
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
