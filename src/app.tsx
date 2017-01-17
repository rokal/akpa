/// <reference path="../typings/require/require.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Percentile} from "./percentile";
import {SimulationDate} from "./simulationDate";
import {ForecastDateBuilder} from "./forecastDateBuilder";

import {ResultsDisplay} from "./components/resultsDisplay";
import {SimulationChart} from "./components/SimulationChart";
import {Header} from "./components/header";
import {NullComponent} from "./components/nullComponent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

//require(["react-easy-chart"], () => {

    // Run the Monte Carlo simulations
    let s = new SimulationDate(30, 1000);
    s.HistoricalThroughput = [3, 2, 1, 0, 4, 2, 4, 1, 2, 0, 4, 2, 5];
    s.execute();

    // Create the forecasts
    let f = new ForecastDateBuilder(s.SimulationResults, 30);
    f.createForecast();
    
    ReactDOM.render(
        <MuiThemeProvider>
        <div>
            <Header/>
            <ResultsDisplay 
                numberOfDays={s.NumberOfDays} 
                numberOfItems={0} 
                numberOfSimulations={s.NumberOfSimulations} 
                forecasts={f.Forecasts} />
            <SimulationChart SimulationResults={s.SimulationResults}/>
        </div>        
        </MuiThemeProvider>,
        document.getElementById("app")
    );

    // Render the outputs with React component ResultsDisplay 
    // ReactDOM.render(
            // <ResultsDisplay 
            //     numberOfDays={s.NumberOfDays} 
            //     numberOfItems={0} 
            //     numberOfSimulations={s.NumberOfSimulations} 
            //     forecasts={f.Forecasts} />        
    //     document.getElementById("sim-summary")
    // );

    // Render the simulation results in a bar chart
    // ReactDOM.render(
    //     <SimulationChart SimulationResults={s.SimulationResults}/>,
    //     document.getElementById("sim-chart")
    // );
    
    // ReactDOM.render(
    //     <Header />,
    //     document.getElementById("app")
    // );
    // ReactDOM.render(
    //    <MuiThemeProvider>
    //         <AppBar
    //             title="Monte Carlo simulations"
    //             onLeftIconButtonTouchTap={callTheMenu} />
    //     </MuiThemeProvider>,
    //     document.getElementById('app')
    // );

    // function callTheMenu(event: Object) {
    //     ReactDOM.render(
    //         <Drawer open={this.state.open}>
    //         <MenuItem>Menu Item</MenuItem>
    //         <MenuItem>Menu Item 2</MenuItem>
    //         </Drawer>,
    //         document.getElementById("theDrawer")
    //     );
    // }

//});     

      