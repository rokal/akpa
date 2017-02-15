/// <reference path="../typings/globals/jest/index.d.ts" />

import { SimulationResult } from "../src/model/simulationResult";

describe("SimulationResult test suite", () => {

    var expectedItems = 100;
    var expectedDays = 30;

    test("Constructor test", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems,
            expectedDays);

        expect(testSimulationResult.NumberOfItemsCompleted).toEqual(expectedItems);
        expect(testSimulationResult.NumberOfDays).toEqual(expectedDays);
        expect(testSimulationResult.Occurences).toEqual(1);
    });

    test("Verify IncrementOccurence", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems,
            expectedDays);

        expect(testSimulationResult.Occurences).toEqual(1);

        testSimulationResult.incrementOccurences();

        expect(testSimulationResult.Occurences).toEqual(2);
    });

    test("Call toString() with loose validation", () => {
        let testSimulationResult = new SimulationResult(
            expectedItems,
            expectedDays);

        expect(testSimulationResult.toString()).not.toBeUndefined();
    });
});