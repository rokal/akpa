/// <reference path="../typings/globals/jest/index.d.ts" />

//import { ForecastDateBuilder } from "../src/model/forecastDateBuilder";
import { SimulationConfig } from "../src/model/simulation/simulationConfig";
import { SimulationDate } from "../src/model/simulation/simulationDate";
import { ThroughputFrequency } from "../src/model/simulation/throughputFrequencyEnum";
import { SimulationExporter } from "../src/model/simulationExporter";

describe("SimulationExporter test suite", () => {

    let simulationConfig: SimulationConfig;
    let simulation: SimulationDate;

    beforeAll(() => {

        simulationConfig = new SimulationConfig(
            [5, 6, 7, 1, 5],
            ThroughputFrequency.Day,
            new Date(2017, 0, 20, 8, 30, 0, 0),
            38,
            100,
            1000);

        simulation = new SimulationDate(simulationConfig);
        simulation.execute();
    });

    it("Test createFilename()", () => {
        
        // Since we set a fixed date in the object in 'beforeAll', 
        // the filename will always be the same
        let expectedFilename = "Forecasts_20_1_2017.json";

        let filename = SimulationExporter.createFilename(simulationConfig);
        expect(filename.length).not.toEqual(0);
        expect(filename).toEqual(expectedFilename);
    });
});
