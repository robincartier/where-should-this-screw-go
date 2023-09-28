type StepType = {
    id: number
    tags: string,
    image: string,
}

function Step({ step }: { step: StepType }) {
    return (
        <li>
            <img src={`data:image/png;base64,${step.image}`} height="50" width="50"/>
            <p>
                {step.tags}
            </p>
        </li>
    );
}

function Steps({ steps }: { steps: StepType[] }) {
    return (
        <ul>
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
