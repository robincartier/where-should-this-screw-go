import StepEntity from "./StepEntity";
import StepUseCases from "./StepUseCases";

interface StepInterface {
    domain: StepUseCases

    addStep: (step: StepEntity) => Promise<StepEntity>
}

export default StepInterface;
