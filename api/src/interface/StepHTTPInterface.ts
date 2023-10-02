import StepInterface from "../domain/step/StepInterface";
import StepEntity from "../domain/step/StepEntity";
import { ErrorType } from "../error";
import Server from "../server";
import StepUseCases from "../domain/step/StepUseCases";
import { Request, Response } from "express";
class StepHTTPInterface implements StepInterface {

    domain;
    server;

    constructor(domain: StepUseCases, server: Server) {
        this.domain = domain;
        this.server = server;

        this.initStepRouting();
    }

    async addStep(step: StepEntity): Promise<StepEntity> {
        const stepEntity = await this.domain.addStep(step);

        return stepEntity;
    }

    initStepRouting() {
        this.server.app.post("/step", 
        // query("tags").trim().notEmpty().escape(),
            this.server.upload.single("image"),
            async (req: Request, res: Response) => {
    
                const dto = req as PostStepRequest;
    
                try {
                    const stepEntity = StepEntity.fromDto(dto);
                    
                    const addedStepEntity = await this.addStep(stepEntity);
                    
                    res.send(addedStepEntity.toDto());
                } catch (error) {
                    const standardError = error as ErrorType;
                    res.status(standardError.http).send(standardError.message);
                }
            }
        );
    }
}

export default StepHTTPInterface;
