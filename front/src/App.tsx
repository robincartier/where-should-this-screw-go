import { useState, useEffect } from "react";
import "./App.css";

import { Steps, StepType } from "./Step";
import Form from "./Form";

function App() {
    useEffect(() => {
        async function fetchSteps() {
            try {
                const response = await fetch("http://localhost:3000/steps", {
                    method: "GET"
                });
                if (response.status === 200) {
                    const steps = await response.json();
    
                    setSteps(steps);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSteps();
    }, []);

    const [steps, setSteps] = useState<StepType[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);

        const requestOptions = {
            method: "POST",
            headers: {},
            body: data,
        };

        try {
            const response = await fetch("http://localhost:3000/step", requestOptions);
            if (response.status === 200) {
                const step = await response.json();

                setSteps([
                    ...steps,
                    { ...step }
                ]);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Form
                handleSubmit={handleSubmit}
            />
            <Steps
                steps={steps}
            />
        </>
    );
}

export default App;
