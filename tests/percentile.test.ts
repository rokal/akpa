/// <reference path="../typings/globals/jest/index.d.ts" />

import {Percentile} from "../src/model/percentile";

describe("Percentile test suite", () => {

    var expected50Value = 0.5;

    test ("Accepts 0.5 as 50%", () => {
        let testPercentile = new Percentile(expected50Value);

        expect(testPercentile.value).toBe(expected50Value);
        expect(testPercentile.toString()).toBe("50%");
    });

    test("Accepts 0 as 0%", () => {
        let expectedZeroValue = 0;
        let testPercentile = new Percentile(expectedZeroValue);

        expect(testPercentile.value).toEqual(expectedZeroValue);
    });

    test("Throws error on negative value", () => {
        let expectedNegativeValue = -1;        
        
        expect(() => {
            new Percentile(expectedNegativeValue);
        }).toThrow();
    });

    test("Throws error on bigger than 100%", () => {
        let expectedTwoValue = 2;
        
        expect(() => {
            new Percentile(expectedTwoValue);
        }).toThrow();
    }); 

    test("Call toString() with loose validation", () => {
        let testPercentile = new Percentile(expected50Value);
        
        expect(testPercentile.toString()).not.toBeUndefined();
    });
});
