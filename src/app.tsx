/// <reference path="../typings/require/require.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Percentile} from "percentile";
import {SimulationDate} from "simulationDate";
import {ResultsDisplay} from "components/resultsDisplay";
import {ForecastDateBuilder} from "ForecastDateBuilder";


require([], () => {

    // Run the Monte Carlo simulations
    let s = new SimulationDate(30, 1000);
    s.HistoricalThroughput = [3, 2, 1, 0, 4, 2, 4, 1, 2, 0, 4, 2, 5];
    s.execute();

    let f = new ForecastDateBuilder(s.SimulationResults, 30);
    f.createForecast();
    
    // Render the outputs with React component ResultsDisplay 
    ReactDOM.render(
        <ResultsDisplay forecasts={f.Forecasts} />,
        document.getElementById("example")
    );

    const chartData: any = {};
    const chartOptions: any = {};

    Chart.Bar()

    // var MyComponent = React.    ({
    //     render: function() {
    //     return <Bar data={chartData} options={chartOptions} width="600" height="250"/>
    //     }
    // });

    // ReactDOM.render(
    //     <Bar data={chartData} options={chartOptions} width="600" height="250"/>, 
    //     document.getElementById("example"));

});     

      