import { ERRORS } from "../../error";
import StepRepository from "./StepRepository";
import StepEntity from "./StepEntity";

class StepUseCases {
    repository;

    constructor(repository: StepRepository) {
        this.repository = repository;
    }

    parseInputTags(tags: string): string[] {
        return tags
            .replace("/ +/g", " ")
            .toLowerCase()
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag);
    }

    async addStep(step: StepEntity) {
        try {
            const id = await this.repository.addStep(step);
    
            const addedStepEntity = await this.repository.getStep(id);
    
            return addedStepEntity;
        } catch (error) {
            throw ERRORS.INTERNAL;
        }
    }

    async getSteps() {
        try {
            const stepsEntities = await this.repository.getSteps();
    
            return stepsEntities;
        } catch (error) {
            throw ERRORS.INTERNAL;
        }
    }
}

export default StepUseCases;
