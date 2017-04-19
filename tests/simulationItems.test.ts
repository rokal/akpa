/// <reference path="../typings/globals/jest/index.d.ts" />

import { SimulationConfig } from "../src/model/simulation/simulationConfig";
import { SimulationItems } from "../src/model/simulation/simulationItems";
import { SimulationResult} from "../src/model/simulation/simulationResult";
import {ThroughputFrequency} from "../src/model/simulation/throughputFrequencyEnum";

describe("SimulationResult test suite", () => {

    test("Execute a simulation for X number of items", () =>{

        let simConfig = new SimulationConfig(
            [1,1,3,5,7,4,2,1,4,1,0,2],
            ThroughputFrequency.Day,
            new Date(),
            25,
            100,
            1000);

        let simulationItems = new SimulationItems(simConfig);
        simulationItems.execute();

        let simResults = simulationItems.SimulationResults;
    })
})