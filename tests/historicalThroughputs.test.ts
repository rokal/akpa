/// <reference path="../typings/globals/jest/index.d.ts" />

import {HistoricalThroughputBuilder} from "../src/model/historicalThroughputBuilder";
import {HistoricalThroughputs} from "../src/model/historicalThroughputs";
import {DateRange} from "../src/model/dateRange";

describe("HistoricalThroughputs test suite", () => {

    let history: HistoricalThroughputs;

    test ("3 valid date ranges", () => {

        let validDateRanges = [
            new DateRange(new Date(2017, 11, 17, 3, 24, 0),
                          new Date(2017, 11, 20, 3, 24, 0)),
            new DateRange(new Date(2017, 11, 14, 6, 45, 0),
                          new Date(2017, 11, 20, 18, 21, 0)),
            new DateRange(new Date(2017, 11, 5, 10, 22, 0),
                          new Date(2017, 11, 6, 14, 27, 0))                      
        ];
        
        history = HistoricalThroughputBuilder.build(validDateRanges);

        expect(history).not.toBeNull();
        expect(history.Count).toEqual(2);
        expect(history.Items.get("2017-12-06")).toEqual(1);
        expect(history.Items.get("2017-12-20")).toEqual(2);        
        expect(history.MinDate).toEqual(new Date(2017, 11, 6, 14, 27, 0));
        expect(history.MaxDate).toEqual(new Date(2017, 11, 20, 18, 21, 0));

        let throughputs = history.spread();

        expect(throughputs.length).toEqual(15);
        expect(throughputs[0]).toEqual(1);
        expect(throughputs[1]).toEqual(0);
        expect(throughputs[2]).toEqual(0);
        expect(throughputs[14]).toEqual(2);                
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

        history = HistoricalThroughputBuilder.build(validDateRanges);

        expect(history).not.toBeNull();
        expect(history.Count).toEqual(2);
        expect(history.Items.get("2017-12-20")).toEqual(1);
        expect(history.Items.get("2017-12-06")).toEqual(1);
        expect(history.MinDate).toEqual(new Date(2017, 11, 6, 14, 27, 0));
        expect(history.MaxDate).toEqual(new Date(2017, 11, 20, 3, 24, 0));

        let throughputs = history.spread();

        expect(throughputs.length).toEqual(14);
        expect(throughputs[0]).toEqual(1);
        expect(throughputs[1]).toEqual(0);
        expect(throughputs[2]).toEqual(0);
        expect(throughputs[13]).toEqual(0);
    })

    test ("Ranges with end dates smaller. All rejected", () => {

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

        history = HistoricalThroughputBuilder.build(validDateRange);

        expect(history).not.toBeNull();
        expect(history.Count).toEqual(0);

        let throughputs = history.spread();

        expect(throughputs.length).toEqual(0);        
    })

    test ("Empty date ranges", () => {

        history = HistoricalThroughputBuilder.build(new Array<DateRange>(0));

        expect(history).not.toBeNull();
        expect(history.Count).toEqual(0);

        let throughputs = history.spread();

        expect(throughputs.length).toEqual(0);         
    })
})