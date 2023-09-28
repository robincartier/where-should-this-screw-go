const Server = require("./server");

const StepDataAdapter = require("./repository/StepRepository");
const StepUseCases = require("./domain/step/StepUseCases");
const StepHTTPInterface = require("./interface/StepHTTPInterface");

const server = new Server();

server.initServer();

const db = require("./db");

const stepDataAdapter = new StepDataAdapter(db);

const stepUseCases = new StepUseCases(stepDataAdapter);

new StepHTTPInterface(stepUseCases, server.app, server.upload);

server.startServer();
