/// <reference path="../typings/require/require.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Percentile} from "./percentile";
import {SimulationDate} from "./simulationDate";
import {ResultsDisplay} from "./components/resultsDisplay";
import {SimulationChart} from "./components/SimulationChart";
import {ForecastDateBuilder} from "./forecastDateBuilder";


//require(["react-easy-chart"], () => {

    // Run the Monte Carlo simulations
    let s = new SimulationDate(30, 1000);
    s.HistoricalThroughput = [3, 2, 1, 0, 4, 2, 4, 1, 2, 0, 4, 2, 5];
    s.execute();

    // Create the forecasts
    let f = new ForecastDateBuilder(s.SimulationResults, 30);
    f.createForecast();
    
    // Render the outputs with React component ResultsDisplay 
    ReactDOM.render(
        <ResultsDisplay 
            numberOfDays={s.NumberOfDays} 
            numberOfItems={0} 
            numberOfSimulations={s.NumberOfSimulations} 
            forecasts={f.Forecasts} />,
        document.getElementById("sim-summary")
    );

    // Render the simulation results in a bar chart
    ReactDOM.render(
        <SimulationChart SimulationResults={s.SimulationResults}/>,
        document.getElementById("sim-chart")
    );



//});     

      