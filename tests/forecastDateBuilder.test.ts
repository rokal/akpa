/// <reference path="../typings/globals/jest/index.d.ts" />

import {Percentile} from "../src/percentile";
import {SimulationResult} from "../src/simulationResult";
import {ForecastItems} from "../src/forecastItems";
import {ForecastDate} from "../src/forecastDate";
import {Forecast} from "../src/forecast";
import {ForecastDateBuilder} from "../src/forecastDateBuilder";
import {ForecastBuilder} from "../src/forecastBuilder";
import {SimulationResultsGenerator} from "./simulationResultsGenerator"; 

describe("ForecastDateBuilder test suite", () => {

    var simulationResultsGenerator = new SimulationResultsGenerator(1000);
    var expectedSimulationResults;

    it("Validate forecasts with default percentiles", () => {

        expectedSimulationResults = simulationResultsGenerator.createSimulationResultsWithFixedDate(30);
        let forecastDateBuilder = new ForecastDateBuilder(expectedSimulationResults, 30);

        forecastDateBuilder.createForecast();

        expect(forecastDateBuilder.Forecasts).not.toBeNull();    
        expect(forecastDateBuilder.Forecasts.length).toBe(5);        
    }); 
});
