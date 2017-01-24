/// <reference path="../typings/globals/jest/index.d.ts" />

import { ForecastDateBuilder } from "../src/forecastDateBuilder";
import { SimulationConfig } from "../src/components/SimulationConfig";
import { SimulationDate } from "../src/simulationDate";
import { SimulationExporter } from "../src/simulationExporter";
import { ThroughputFrequency } from "../src/throughputFrequencyEnum";

describe("SimulationExporter test suite", () => {

    let simulationConfig: SimulationConfig;
    let simulation: SimulationDate;
    let forecastDateBuilder: ForecastDateBuilder;

    beforeAll(() => {

        simulationConfig = new SimulationConfig(
            [5, 6, 7, 1, 5],
            ThroughputFrequency.Day,
            new Date(),
            38,
            100);

        simulation = new SimulationDate(
            simulationConfig.StartDate,
            simulationConfig.NumberOfDays,
            1000,
            simulationConfig.ThroughputFrequency);
        simulation.HistoricalThroughput = simulationConfig.HistoricalThroughput;
        simulation.execute();

        forecastDateBuilder = new ForecastDateBuilder(simulation.SimulationResults, simulation.NumberOfDays);
        forecastDateBuilder.createForecast();
    });

    it("Test export() in normal case", () => {

        let content;

        content = SimulationExporter.export(simulationConfig, simulation.SimulationResults);
        expect(content).not.toBeNull();
    });

    it("Test createFilename()", () => {
        
        let filename = SimulationExporter.createFilename(simulationConfig);
        expect(filename.length).not.toEqual(0);
        expect(filename.startsWith("Forecasts_")).toBeTruthy();
    });
});