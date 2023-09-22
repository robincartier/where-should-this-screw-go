import { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Step = {
  id: number
  tags: string,
  picture: string,
}

function App() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepCounter, setStepCounter] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>, source ) {
    e.preventDefault();

    if (e.target.tags == undefined || !e.target.tags.value) return;

    setSteps([
      ...steps,
      {
        id: stepCounter,
        tags: e.target.tags.value,
        picture: source,
    }]);

    const data = new FormData();

    data.append('picture', e.target.picture.files[0]);
    data.append('tags', e.target.tags.value);

    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors', 
      headers: {  },
      // body: JSON.stringify({
      //   id: stepCounter,
      //   tags: e.target.tags.value,
      //   image: source
      // })
      body: data,
    };

    try {
      const response = await fetch('http://localhost:3000/steps', requestOptions);
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);
      }
    } catch (error) {
      console.error(error)
    }

    setStepCounter(stepCounter + 1)

    // try {
    //   await submitForm(answer);
    //   setStatus('success');

    // } catch (err) {
    //   setStatus('typing');
    // }
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
  )
}

// function Camera() {
//   return (
//     <Form/>
//   )

// }

function Form({ handleSubmit }: { handleSubmit: (e: FormEvent<HTMLFormElement>, source: string) => Promise<void> }) {
  const [source, setSource] = useState("")

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);

        if (!document) return;

        const pictureElement = document.getElementById("form-picture")!
        pictureElement.setAttribute("src", newUrl)
        pictureElement.setAttribute("style", "")
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, source)}>
      <label htmlFor="picture">Picture:</label>
      <input 
        type="file" 
        name="picture"
        accept="image/*" 
        capture="environment" 
        onChange={(e) => handleCapture(e.target)} 
      />
      <img id="form-picture" height="50" width="50" style={{ display:"none" }} />
      <label htmlFor="tags">Tags: </label>
      <textarea name="tags" id="tags"></textarea>
      <div>
        <button type="submit">Add item</button>
      </div>
    </form>
  )
}

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ul>
      {steps.map(step => 
        <Step
          key={step.id}
          step={step}
        />
      )}
    </ul>
  )
}

function Step({step}: { step: Step }) {
  return (
    <li>
      <img src={step.picture} height="50" width="50"/>
      <p>
        {step.tags}
      </p>
    </li>
  )
}
export default App
