const express = require("express");
const multer  = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const StepDataAdapter = require("./step/StepDBAdapter");
const step = require("./step/index");
const StepUserAdapter = require("./step/StepHTTPAdapter");

const db = require("./db");

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const stepDataAdapter = new StepDataAdapter(db);

const stepDomain = step(stepDataAdapter);

new StepUserAdapter(stepDomain, app, upload);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
