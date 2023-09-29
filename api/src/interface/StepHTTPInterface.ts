import StepInterface from "../domain/step/StepInterface";
import StepEntity from "../domain/step/StepEntity";

class StepHTTPAdapter implements StepInterface {

    domain;

    constructor(domain, app, upload) {
        this.domain = domain;

        this.initStepRouting(app, upload);
    }

    async addStep(step: StepEntity): Promise<StepEntity> {
        const stepEntity = await this.domain.addStep(step);

        return stepEntity;
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
                    res.status(error.http).send(error.message);
                }
            }
        );
    }
}

export default StepHTTPAdapter;
