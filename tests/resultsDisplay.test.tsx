/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../typings/modules/react-test-renderer/index.d.ts" />

//import React from "react";
import * as React from "react";
import {create} from "react-test-renderer";

import {Forecast} from "../src/Forecast";
import {ForecastItems} from "../src/forecastItems";
import {Percentile} from "../src/Percentile";
import {ResultsDisplay} from "../src/components/resultsDisplay";

describe("ResultsDisplay test suite", () => {
    
    var expectedPercentile = new Percentile(0.5);
    var expectedItems = 100;
    var expectedDays = 30;

    it("First test", () => {

        let fc = new Array<Forecast>(1);
        fc[0] = new ForecastItems(
            expectedPercentile,
            expectedItems,
            expectedDays);

        const component = create(
            <ResultsDisplay 
                numberOfDays={expectedDays}
                numberOfItems={expectedItems}
                numberOfSimulations={1000}
                forecasts={fc} />);
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();;
    });
});