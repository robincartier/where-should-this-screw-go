const { query } = require ("./db");

module.exports = {
    setStep(tags, image) {
        return query(
            "INSERT INTO steps(tags, image) VALUES ($1, $2) RETURNING id",
            [tags, image]
        );
    },

    getStep(id) {
        return query(
            "SELECT * FROM steps WHERE id = $1",
            [id]
        );
    },
};
