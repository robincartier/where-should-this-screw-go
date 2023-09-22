const { query } = require ("../db");

module.exports = {
    setStep(step) {
        return  query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2) RETURNING id",
            [step.tags, step.image]
        );
    },

    getStep(id) {
        return query(
            "SELECT * FROM steps WHERE id = $1",
            [id]
        );
    },
};
