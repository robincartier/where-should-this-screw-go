const { query } = require ("../db");

module.exports = {
    async getSteps() {
        // return "here are the steps"
        try {
            const result = await query("INSERT INTO steps(tags) VALUES ('aa')");
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

};
