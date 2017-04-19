/// <reference path="../typings/globals/jest/index.d.ts" />

// import {Forecast} from "../src/model/forecast/forecast";
// import {ForecastBuilder} from "../src/model/forecast/forecastBuilder";
import {ForecastDateBuilder} from "../src/model/forecast/forecastDateBuilder";
import {SimulationResultsGenerator} from "./simulationResultsGenerator"; 

describe("ForecastDateBuilder test suite", () => {

    var simulationResultsGenerator = new SimulationResultsGenerator(1000);
    var expectedSimulationResults;

    test("Validate forecasts with default percentiles", () => {

        expectedSimulationResults = simulationResultsGenerator.createSimulationResultsWithFixedDate(30);
        let forecastDateBuilder = new ForecastDateBuilder(expectedSimulationResults, 30);

        forecastDateBuilder.createForecast();

        expect(forecastDateBuilder.Forecasts).not.toBeNull();    
        expect(forecastDateBuilder.Forecasts.length).toBe(5);        
    }); 
});
