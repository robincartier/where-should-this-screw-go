import StepEntity from "./StepEntity";

interface StepRepository {
    addStep: (step: StepEntity) => Promise<number>

    getStep: (id: number) => Promise<StepEntity>

    getSteps: () => Promise<StepEntity[]>
}

export default StepRepository;
