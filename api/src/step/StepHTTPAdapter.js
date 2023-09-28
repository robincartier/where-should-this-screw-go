const StepUserInterface = require("./StepUserInterface");
const Step = require("./Step");

class StepHTTPAdapter extends StepUserInterface {

    constructor(domain, app, upload) {
        super(domain);

        this.initStepRouting(app, upload);
    }

    async addStep(step) {
        const id = await this.domain.addStep(step);

        return id;
    }

    async getStep(id) {
        const step = await this.domain.getStep(id);

        return step;
    }

    initStepRouting(app, upload) {
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
                
                const id = await this.addStep(step);
    
                if (id === -1) {
                    res.status(500).send("Internal Server Error");
                    return;
                }
    
                const addedStep = await this.getStep(id);
    
                if (addedStep === null) {
                    res.status(500).send("Internal Server Error");
                    return;
                }
    
                res.send(addedStep.toJSON());
            }
        );
    }
}

module.exports = StepHTTPAdapter;
