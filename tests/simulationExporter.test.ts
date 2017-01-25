/// <reference path="../typings/globals/jest/index.d.ts" />

import { ForecastDateBuilder } from "../src/forecastDateBuilder";
import { SimulationConfig } from "../src/components/SimulationConfig";
import { SimulationDate } from "../src/simulationDate";
import { SimulationExporter } from "../src/simulationExporter";
import {SimulationImporter} from "../src/simulationImporter";
import { ThroughputFrequency } from "../src/throughputFrequencyEnum";

describe("SimulationExporter test suite", () => {

    let simulationConfig: SimulationConfig;
    let simulation: SimulationDate;

    beforeAll(() => {

        simulationConfig = new SimulationConfig(
            [5, 6, 7, 1, 5],
            ThroughputFrequency.Day,
            new Date(2017, 0, 20, 8, 30, 0, 0),
            38,
            100);

        simulation = new SimulationDate(
            simulationConfig.StartDate,
            simulationConfig.NumberOfDays,
            20,
            simulationConfig.ThroughputFrequency);
        simulation.HistoricalThroughput = simulationConfig.HistoricalThroughput;
        simulation.execute();
    });

    it("Test export() in normal case", () => {

        let content;

        content = SimulationExporter.export(simulationConfig, simulation.SimulationResults);
        expect(content).not.toBeNull();
        expect(content.startsWith("data:attachment/json")).toBeTruthy();

        // Strip the first part (plus the comma) to only get the JSON
        let json = content.substring("data:attachment/json".length + 1);
        try
        {
            let objects = SimulationImporter.import(json);
        }
        catch (ex)
        {
            console.error(ex);
        }
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