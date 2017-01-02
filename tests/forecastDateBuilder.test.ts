/// <reference path="../typings/globals/jest/index.d.ts" />

import {Percentile} from "../src/Percentile";
import {SimulationResult} from "../src/SimulationResult";
import {ForecastDateBuilder} from "../src/forecastDateBuilder";
import {ForecastBuilder} from "../src/forecastBuilder";
 
describe("ForecastDateBuilder test suite", () => {

    var expectedSimulationResults = [
        new SimulationResult(40, 30),
        new SimulationResult(45, 30)
    ];

    it("Contructor with null or empty simulation results", () => {

    debugger;
        let forecastDateBuilder = new ForecastDateBuilder(expectedSimulationResults, 1000, 30);

        forecastDateBuilder.createForecast();
        expect(forecastDateBuilder.Forecasts).not.toBeNull();    

    }); 

});
