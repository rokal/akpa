/// <reference path="../typings/require/require.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />
define(["require", "exports", "react", "react-dom", "simulationNumberOfDays", "components/resultsDisplay"], function (require, exports, React, ReactDOM, simulationNumberOfDays_1, resultsDisplay_1) {
    "use strict";
    require([], function () {
        // Run the Monte Carlo simulations
        var s = new simulationNumberOfDays_1.SimulationNumberOfDays(30, 1000);
        s.HistoricalThroughput = [3, 2, 1, 0, 4, 2, 4, 1, 2, 0, 4, 2, 5];
        s.execute();
        s.createForecast();
        // Render the outputs with React component ResultsDisplay 
        ReactDOM.render(React.createElement(resultsDisplay_1.ResultsDisplay, { forecasts: s.Forecasts }), document.getElementById("example"));
    });
});
//# sourceMappingURL=app.js.map