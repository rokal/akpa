/// <reference path="../typings/globals/jest/index.d.ts" />

import {Percentile} from "../src/model/percentile";
import {ForecastItems} from "../src/model/forecastItems";
 
describe("ForecastItems test suite", () => {

    var expectedPercentile = new Percentile(0.5);
    var expectedNumberItems = 100;
    var expectedDays = 40;

    test("Accepts standard values to properties", () => {       
        let testForecast = new ForecastItems(
            expectedPercentile,
            expectedNumberItems,
            expectedDays);
        
        expect(testForecast.Percentile).toEqual(expectedPercentile);
        expect(testForecast.NumberOfItemsCompleted).toEqual(expectedNumberItems);
        expect(testForecast.NumberOfDays).toEqual(expectedDays);
    });

    test("Call toString() with loose validation", () => {
        let testForecast = new ForecastItems(
            expectedPercentile,
            expectedNumberItems,
            expectedDays);

        expect(testForecast.toString()).not.toBeUndefined();
    });
});