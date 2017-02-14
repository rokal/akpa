/// <reference path="../typings/globals/jest/index.d.ts" />

import {ThroughputBuilder} from "../src/model/throughputBuilder";
import {DateRange} from "../src/model/dateRange";

describe("ThroughputBuilder test suite", () => {

    let throughputs: Array<number>;

    test ("3 valid date ranges", () => {

        let validDateRanges = [
            new DateRange(new Date(2017, 11, 17, 3, 24, 0),
                          new Date(2017, 11, 20, 3, 24, 0)),
            new DateRange(new Date(2017, 11, 14, 6, 45, 0),
                          new Date(2017, 11, 20, 18, 21, 0)),
            new DateRange(new Date(2017, 11, 5, 10, 22, 0),
                          new Date(2017, 11, 6, 14, 27, 0))                      
        ];
        
        throughputs = ThroughputBuilder.build(validDateRanges);

        expect(throughputs).not.toBeNull();
        expect(throughputs.length).toEqual(2);
        expect(throughputs[0]).toEqual(2);
        expect(throughputs[1]).toEqual(1);
    })

    test ("2 valid and 1 invalid date range", () => {

        let validDateRanges = [
            new DateRange(new Date(2017, 11, 17, 3, 24, 0), // Valid range
                          new Date(2017, 11, 20, 3, 24, 0)),
            new DateRange(new Date(2017, 11, 20, 6, 45, 0), // Invalid range
                          new Date(2017, 11, 14, 18, 21, 0)),
            new DateRange(new Date(2017, 11, 5, 10, 22, 0), // Valid range
                          new Date(2017, 11, 6, 14, 27, 0))                      
        ];

        throughputs = ThroughputBuilder.build(validDateRanges);

        expect(throughputs).not.toBeNull();
        expect(throughputs.length).toEqual(2);
        expect(throughputs[0]).toEqual(1);
        expect(throughputs[1]).toEqual(1);
    })

    test ("Ranges with end dates smaller", () => {

        let validDateRange = [
            new DateRange(new Date(2017, 11, 6, 14, 56, 0), 
                          new Date(2017, 11, 6, 13, 57, 0)),// Smaller by the hour
            new DateRange(new Date(2017, 11, 6, 14, 55, 0),
                          new Date(2017, 11, 6, 14, 25, 0)),// Smaller by the seconds 
            new DateRange(new Date(2017, 11, 6, 14, 25, 0),
                          new Date(2017, 11, 5, 17, 47, 0)),// Smaller by the day
            new DateRange(new Date(2017, 11, 6, 14, 25, 0),
                          new Date(2017, 10, 7, 17, 47, 0)),// Smaller by the month                                                                              
        ];

        throughputs = ThroughputBuilder.build(validDateRange);

        expect(throughputs).not.toBeNull();
        expect(throughputs.length).toEqual(0);        
    })

    test ("Empty date ranges", () => {

        throughputs = ThroughputBuilder.build(new Array<DateRange>(0));

        expect(throughputs).not.toBeNull();
        expect(throughputs.length).toEqual(0);
    })
})