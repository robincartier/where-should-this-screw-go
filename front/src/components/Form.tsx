import { useState } from "react";

function Form({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> }) {

    const [pictureSrc, setPictureSrc] = useState("");

    function _handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        handleSubmit(e).then(() => {
            setPictureSrc("");
        });
    }

    function handleCapture(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            if (e.target.files.length !== 0) {
                const file = e.target.files[0];
                const newUrl = URL.createObjectURL(file);
  
                setPictureSrc(newUrl);
            }
        }
    }
  
    return (
        <form onSubmit={(e) => _handleSubmit(e)}>
            <label htmlFor="image">Picture:</label>
            <input 
                type="file" 
                name="image"
                accept="image/*" 
                capture="environment" 
                onChange={(e) => handleCapture(e)} 
            />
            <img id="form-picture" height="50" width="50" src={pictureSrc} />
            <label htmlFor="tags">Tags: </label>
            <textarea name="tags" id="tags"></textarea>
            <div>
                <button type="submit">Add item</button>
            </div>
        </form>
    );
}

export default Form;
