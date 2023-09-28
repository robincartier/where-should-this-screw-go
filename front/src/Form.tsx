function Form({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> }) {
  
    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length !== 0) {
                const file = e.target.files[0];
                const newUrl = URL.createObjectURL(file);
  
                if (!document) return;
  
                const pictureElement = document.getElementById("form-picture")!;
                pictureElement.setAttribute("src", newUrl);
                pictureElement.setAttribute("style", "");
            }
        }
    };
  
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="image">Picture:</label>
            <input 
                type="file" 
                name="image"
                accept="image/*" 
                capture="environment" 
                onChange={(e) => handleCapture(e)} 
            />
            <img id="form-picture" height="50" width="50" style={{ display:"none" }} />
            <label htmlFor="tags">Tags: </label>
            <textarea name="tags" id="tags"></textarea>
            <div>
                <button type="submit">Add item</button>
            </div>
        </form>
    );
}

export default Form;
