const stepRepository = require("./db/stepRepository");

const Step = require("../domain/entity/Step");

module.exports = {

    async addStep(step) {
        try {
            const response = await stepRepository.setStep(step.tags, step.image);

            const id = response.rows[0].id;
            return id;

        } catch (err) {
            console.error(err);

            return -1;
        }
    },

    async getStep(id) {
        try {
            const response = await stepRepository.getStep(id);

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
    },

};
