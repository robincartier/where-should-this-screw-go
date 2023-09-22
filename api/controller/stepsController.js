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
    upload.single('picture'),
        // query("tags").trim().notEmpty().escape(),
        async (req, res) => {


            // const form = new formidable.IncomingForm({});

            // form.parse(req, async (err, fields, files) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(400).json({ message: err.message });
            //         return; 
            //     }
            //     console.log('fields:', fields);
            //     console.log('files:', files);

            //     const step = new Step(req.body);

            //     try {
            //         const steps = await stepsRepository.getSteps(step);
            //         res.send(steps);
            //     } catch (err) {
            //         console.error(err);
            //         res.status(500).send('Internal Server Error');
            //     }

            //     // res.json({ fields, files });
            // });

            // The `files` object contains all files that were uploaded. Formidable
            // parses each file and uploads it to a temporary file for you.
            // const [firstFileName] = Object.keys(files);

            // res.json({ filename: firstFileName });

            // req.body; // JavaScript object containing the parse JSON

            console.log(req.file)

            if (!req.body.tags) {
                res.status(400).send("Invalid format");
                return;
            }

            try {
                // const buffer = Buffer.from(blob,'binary');
                // console.log(req.body.image);
                // const test = await fetch(req.body.image, {
                //      }).then((res) => res.buffer())
                // console.log(test)
                // const image = fs.readFileSync(req.body.image)
                // const image = await fetch(req.body.image, {
                //     method: 'GET',
                //     headers: { 'Accept': '*/*' }
                //  }).then((res) => res.buffer())

                const step = new Step({
                    tags: req.body.tags, 
                    image: req.file.buffer,
                });
                
                const steps = await stepsRepository.getSteps(step);
                res.send(steps);
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
            
        }
    );

}