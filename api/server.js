const express = require('express');

const db = require('./db');
const stepsController = require("./controller/stepsController");

const app = express()
const port = 3000

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}),

stepsController(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})