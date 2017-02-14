/// <reference path="../typings/globals/jest/index.d.ts" />

import {SimulationResultsGenerator} from "./simulationResultsGenerator"; 

import {Percentile} from "../src/model/percentile";
import {SimulationResult} from "../src/model/simulationResult";
import {ForecastItems} from "../src/model/forecastItems";
import {ForecastDate} from "../src/model/forecastDate";
import {Forecast} from "../src/model/forecast";
import {ForecastDateBuilder} from "../src/model/forecastDateBuilder";
import {ForecastBuilder} from "../src/model/forecastBuilder";

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
