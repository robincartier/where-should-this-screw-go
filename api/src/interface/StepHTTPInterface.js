const { ERRORS } = require("../error");
const StepInterface = require("../domain/step/StepInterface");
const StepEntity = require("../domain/step/StepEntity");

class StepHTTPAdapter extends StepInterface {

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
    
                const dto = req;
    
                try {
                    const stepEntity = StepEntity.fromDto(dto);
                    
                    const addedStepEntity = await this.addStep(stepEntity);
                    
                    if (addedStepEntity === null) {
                        res.status(500).send("Internal Server Error");
                        return;
                    }
                    
                    res.send(addedStepEntity.toDto());
                } catch (error) {
                    res.status(ERRORS[error.cause].http).send(ERRORS[error.cause].message);
                }
            }
        );
    }
}

module.exports = StepHTTPAdapter;
