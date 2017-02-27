/// <reference path="../typings/globals/jest/index.d.ts" />

import {CycleTimeBuilder} from "../src/model/cycleTimeBuilder";
import {DateRange} from "../src/model/dateRange";

describe("ThroughputBuilder test suite", () => {

        let validDateRanges = [
            new DateRange(new Date(2017, 11, 17, 3, 24, 0),
                          new Date(2017, 11, 20, 3, 24, 0)),
            new DateRange(new Date(2017, 11, 14, 6, 45, 0),
                          new Date(2017, 11, 20, 18, 21, 0)),
            new DateRange(new Date(2017, 11, 5, 10, 22, 0),
                          new Date(2017, 11, 6, 14, 27, 0)),
            new DateRange(new Date(2017, 11, 11, 10, 22, 0),
                          new Date(2017, 11, 11, 14, 27, 0))
        ];


    test("With some date ranges", () => {

        let cycleTimes = CycleTimeBuilder.build(validDateRanges);

        expect(cycleTimes).not.toBeNull();
        expect(cycleTimes.length).toEqual(4);
        expect(cycleTimes[0]).toEqual(4);
        expect(cycleTimes[1]).toEqual(7);
        expect(cycleTimes[2]).toEqual(2);
        expect(cycleTimes[3]).toEqual(1);
    })
})