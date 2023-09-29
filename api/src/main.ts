import Server from "./server";

import StepDataAdapter from "./repository/StepDBRepository";
import StepUseCases from "./domain/step/StepUseCases";
import StepHTTPInterface from "./interface/StepHTTPInterface";
import db from "./db";

const server = new Server();

server.initServer();

const stepDataAdapter = new StepDataAdapter(db);

const stepUseCases = new StepUseCases(stepDataAdapter);

new StepHTTPInterface(stepUseCases, server.app, server.upload);

server.startServer();
