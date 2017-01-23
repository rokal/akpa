/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {SimulationDate} from "../simulationDate";
import {ForecastDateBuilder} from "../forecastDateBuilder";

import {Header} from "./header";
import {ResultsDisplay} from "./resultsDisplay";
import {SimulationConfig} from "./simulationConfig";
import {SimulationChart} from "./simulationChart";

// This fix the touch tap event which is not currently supported
// in the official React release. It will be removed one day when
// React integrates it
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export interface AppProps{}
export class Application extends React.Component<AppProps, undefined>{

    private simulation:SimulationDate;
    private forecastDateBuilder:ForecastDateBuilder;
    private simulationRan:boolean;

    constructor(props: AppProps){
        super(props);
        this.simulationRan = false;
    }

    render(): JSX.Element{
        return <MuiThemeProvider>
        <div>
            <Header cbLaunchSimulation={this.cbLaunchSimulation.bind(this)}/>
            {this.simulationRan && 
                <ResultsDisplay 
                numberOfDays={this.simulation.NumberOfDays} 
                numberOfItems={0} 
                numberOfSimulations={this.simulation.NumberOfSimulations} 
                forecasts={this.forecastDateBuilder.Forecasts} />}
            {this.simulationRan &&  
                <SimulationChart SimulationResults={this.simulation.SimulationResults}/>}
        </div>        
        </MuiThemeProvider>
    }

    cbLaunchSimulation(data:SimulationConfig): void{
        this.simulation = new SimulationDate(
            data.StartDate,
            data.NumberOfDays, 
            1000,
            data.ThroughputFrequency);
        this.simulation.HistoricalThroughput = data.HistoricalThroughput;
        this.simulation.execute();

        this.forecastDateBuilder = new ForecastDateBuilder(this.simulation.SimulationResults, data.NumberOfDays);
        this.forecastDateBuilder.createForecast();

        this.simulationRan = true;
        this.setState(undefined);   
    }
}