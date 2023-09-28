import { useState } from "react";
import "./App.css";

import { Steps, StepType } from "./Step";
import Form from "./Form";

function App() {
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
            const response = await fetch("http://localhost:3000/steps", requestOptions);
            if (response.status === 200) {
                const json = await response.json();

                setSteps([
                    ...steps,
                    {...json.rows[0]}
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
