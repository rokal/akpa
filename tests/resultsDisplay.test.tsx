/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../typings/modules/react-test-renderer/index.d.ts" />

import * as React from "react";
import {create} from "react-test-renderer";

import {Forecast} from "../src/model/forecast/forecast";
import {ForecastItems} from "../src/model/forecast/forecastItems";
import {Percentile} from "../src/model/forecast/percentile";
import {SimulationConfig} from "../src/model/simulation/simulationConfig";
import {ThroughputFrequency} from "../src/model/simulation/throughputFrequencyEnum";
import {ResultsDisplay} from "../src/view/resultsDisplay";

describe("ResultsDisplay test suite", () => {
    
    var expectedPercentile = new Percentile(0.5);
    var expectedItems = 100;
    var expectedDays = 30;
    var expectedConfig = new SimulationConfig(
        [6,7,1,6,2,4,6,0,2,1,5],
        ThroughputFrequency.Week,
        new Date(),
        expectedDays,
        expectedItems,
        1000);

    test("First test", () => {

        /*let fc = new Array<Forecast>(1);
        fc[0] = new ForecastItems(
            expectedPercentile,
            expectedItems,
            expectedDays);

        const component = create(
            <ResultsDisplay 
                simulationConfig={expectedConfig}
                forecasts={fc}
                orderedAsc={false}
                cbDaysChanged={() => {}} />);
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();;*/
    });
});