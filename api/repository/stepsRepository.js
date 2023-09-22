const { query } = require ("../db");

module.exports = {
    getSteps(step) {
        return  query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2)",
            [step.tags, step.image]);
    }

};
