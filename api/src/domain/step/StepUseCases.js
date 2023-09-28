const { ERRORS } = require("../../error");

class StepUseCases {
    constructor(dataInterface) {
        this.dataInterface = dataInterface;
    }

    async addStep(step) {
        try {
            const id = await this.dataInterface.addStep(step);
    
            const addedStepEntity = await this.dataInterface.getStep(id);
    
            return addedStepEntity;
        } catch (error) {
            throw new Error("internal", { cause: ERRORS.INTERNAL.code });
        }
    }
}

module.exports = StepUseCases;
