/// <reference path="../typings/globals/jest/index.d.ts" />

import {SimulationResult} from "../src/simulationResult";

describe("SimulationResult test suite", () => {



    var expectedItems = 100;
    var expectedDays = 30; 

    it("Constructor test", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems, 
            expectedDays);

        expect(testSimulationResult.NumberOfItemsCompleted).toEqual(expectedItems);
        expect(testSimulationResult.NumberOfDays).toEqual(expectedDays);
        expect(testSimulationResult.Occurences).toEqual(1);
    });

    it("Verify IncrementOccurence", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems,
            expectedDays);

        expect(testSimulationResult.Occurences).toEqual(1);

        testSimulationResult.incrementOccurences();

        expect(testSimulationResult.Occurences).toEqual(2);    
    });

    it ("Call toString() with loose validation", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems, 
            expectedDays);

        expect(testSimulationResult.toString()).not.toBeUndefined();
    });
});