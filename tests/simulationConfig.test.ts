/// <reference path="../typings/globals/jest/index.d.ts" />

import { SimulationConfig } from "../src/model/simulation/simulationConfig";
import { ThroughputFrequency } from "../src/model/simulation/throughputFrequencyEnum";

describe("SimulationConfig test suite", () => {

    test("Check DeliveryDate calculations", () => {

        let expectedConfig = new SimulationConfig(new Array<number>(0),
            ThroughputFrequency.Day,
            new Date(2017, 0, 1), // January 1 2017
            10,
            100,
            1000);

        expect(expectedConfig.DeliveryDate.getFullYear()).toEqual(2017);
        expect(expectedConfig.DeliveryDate.getMonth()).toEqual(0);
        expect(expectedConfig.DeliveryDate.getDate()).toEqual(11);

        // Change the start date
        expectedConfig.StartDate = new Date(2017, 2, 20); // March 20 2017

        // See if the DeliveryDate property has changed accurately
        // We are March 20 and 'NumberOfDays' property is set at 10
        // We should be at March 30 2017
        expect(expectedConfig.DeliveryDate.getFullYear()).toEqual(2017);
        expect(expectedConfig.DeliveryDate.getMonth()).toEqual(2);
        expect(expectedConfig.DeliveryDate.getDate()).toEqual(30);

        // Change the number of numbers        
        expectedConfig.NumberOfDays = 20; // Moving to April 11 2017

        // We should be April 11 2017
        expect(expectedConfig.DeliveryDate.getFullYear()).toEqual(2017);
        expect(expectedConfig.DeliveryDate.getMonth()).toEqual(3);
        expect(expectedConfig.DeliveryDate.getDate()).toEqual(9);
    })

    test("Verify Empty object properties", () => {

        expect(SimulationConfig.Empty.HistoricalThroughput.length).not.toBeNull();
        expect(SimulationConfig.Empty.HistoricalThroughput.length).toEqual(0);

        expect(SimulationConfig.Empty.ThroughputFrequency).toEqual(ThroughputFrequency.Day);
        expect(SimulationConfig.Empty.NumberOfDays).toEqual(25);
        expect(SimulationConfig.Empty.NumberOfItems).toEqual(100);
        expect(SimulationConfig.Empty.NumberOfSimulations).toEqual(1000);
        expect(SimulationConfig.Empty.StartDate.getFullYear()).toEqual(1900);
        expect(SimulationConfig.Empty.StartDate.getMonth()).toEqual(0);
        expect(SimulationConfig.Empty.StartDate.getDate()).toEqual(1);

        expect(SimulationConfig.Empty.DeliveryDate.getFullYear()).toEqual(1900);
        expect(SimulationConfig.Empty.DeliveryDate.getMonth()).toEqual(0);
        expect(SimulationConfig.Empty.DeliveryDate.getDate()).toEqual(26);
    })
})