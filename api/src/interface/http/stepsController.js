// const formidable = require("formidable");
// const { query } = require("express-validator");

const { addStep, getStep } = require("../../domain/domain");

const Step = require("../../domain/entity/Step");

module.exports = (app, upload) => {
    app.post("/step", 
    // query("tags").trim().notEmpty().escape(),
        upload.single("image"),
        async (req, res) => {

            if (!req.body.tags) {
                res.status(400).send("Invalid format");
                return;
            }

            const step = new Step({
                tags: req.body.tags, 
                image: req.file.buffer,
            });
            
            const id = await addStep(step);

            if (id === -1) {
                res.status(500).send("Internal Server Error");
                return;
            }

            const addedStep = await getStep(id);

            if (addedStep === null) {
                res.status(500).send("Internal Server Error");
                return;
            }

            res.send(addedStep.toJSON());
        }
    );
};