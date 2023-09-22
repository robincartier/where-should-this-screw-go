const formidable = require("formidable");
const { query } = require('express-validator');

const stepsRepository = require("../repository/stepsRepository");
var fetch = require ('node-fetch');


class Step {
    constructor({ image, tags}) {
        this._tags = tags;
        this._image = image;
    }

    _tags
    get tags() {
        return this._tags;
    }
    set tags(tags) {
        this._tags = tags;
    }

    _image
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }

}

module.exports = (app, upload) => {
    app.post("/steps", 
    // query("tags").trim().notEmpty().escape(),
        upload.single('image'),
        async (req, res) => {

            if (!req.body.tags) {
                res.status(400).send("Invalid format");
                return;
            }

            try {
                const step = new Step({
                    tags: req.body.tags, 
                    image: req.file.buffer,
                });
                
                const uploadResponse = await stepsRepository.setStep(step);
                const downloadResponse = await stepsRepository.getStep(uploadResponse.rows[0].id);
                console.log( downloadResponse.rows[0].image)

                downloadResponse.rows[0].image = downloadResponse.rows[0].image.toString("base64");

                res.send(downloadResponse);
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
            
        }
    );
}