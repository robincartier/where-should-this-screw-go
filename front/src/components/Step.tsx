import "../style/Step.css";

type StepType = {
    id: number
    tags: string[],
    image: string,
}

function Step({ step }: { step: StepType }) {
    return (
        <li className="step">
            <img src={`data:image/png;base64,${step.image}`}/>
            <p>
                {step.tags.toString()}
            </p>
        </li>
    );
}

function Steps({ steps }: { steps: StepType[] }) {
    return (
        <ul className="steps">
            {steps.map(step => 
                <Step
                    key={step.id}
                    step={step}
                />
            )}
        </ul>
    );
}

export type { StepType };
export { Steps };
