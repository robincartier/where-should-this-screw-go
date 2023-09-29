import { ERRORS } from "../../error";

class StepUseCases {

    dataInterface;

    constructor(dataInterface) {
        this.dataInterface = dataInterface;
    }

    async addStep(step) {
        try {
            const id = await this.dataInterface.addStep(step);
    
            const addedStepEntity = await this.dataInterface.getStep(id);
    
            return addedStepEntity;
        } catch (error) {
            throw ERRORS.INTERNAL;
        }
    }
}

export default StepUseCases;
