const stepsRepository = require("../repository/stepsRepository");

module.exports = (app) => {
    app.post("/steps", (req, res) => {
        req.body; // JavaScript object containing the parse JSON
        // res.json(req.body);

        // console.log(res)
        const steps = stepsRepository.getSteps();
        res.send(steps);
    })

}