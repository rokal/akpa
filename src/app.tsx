/// <reference path="../typings/require/require.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Percentile} from "percentile";
import {SimulationNumberOfDays} from "simulationNumberOfDays";
import {ResultsDisplay} from "components/resultsDisplay";

require([], () => {

    // Run the Monte Carlo simulations
    var s = new SimulationNumberOfDays(30, 1000);
    s.HistoricalThroughput = [3, 2, 1, 0, 4, 2, 4, 1, 2, 0, 4, 2, 5];
    s.execute();
    //s.createForecast();
    
    // Render the outputs with React component ResultsDisplay 
    // ReactDOM.render(
    //     <ResultsDisplay forecasts={s.Forecasts} />,
    //     document.getElementById("example")
    // );

});     

      