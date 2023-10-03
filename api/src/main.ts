import Server from "./server";

import StepDBRepository from "./repository/StepDBRepository";
import StepUseCases from "./domain/step/StepUseCases";
import StepHTTPInterface from "./interface/StepHTTPInterface";
import { query, transaction } from "./db";

const server = new Server();

server.initServer();

const stepDBRepository = new StepDBRepository(query, transaction);

const stepUseCases = new StepUseCases(stepDBRepository);

new StepHTTPInterface(stepUseCases, server);

server.startServer();
