/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimulationDate } from "../simulationDate";
import { ForecastDateBuilder } from "../forecastDateBuilder";
import { SimulationResult } from "../simulationResult";
import { SimulationExporter } from "../simulationExporter";
import { ThroughputFrequency } from "../throughputFrequencyEnum";

import { Header } from "./header";
import { ResultsDisplay } from "./resultsDisplay";
import { SimulationConfig } from "./simulationConfig";
import { SimulationChart } from "./simulationChart";

import IconButton from "material-ui/IconButton";
import GetAppIcon from "material-ui/svg-icons/action/get-app";

// This fix the touch tap event which is not currently supported
// in the official React release. It will be removed one day when
// React integrates it
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export interface AppProps { }
export interface AppState {
    simulationConfig: SimulationConfig,
    simulationDateResults: Array<SimulationResult>,
    simulationItemsResults?: Array<SimulationResult>
}
export class Application extends React.Component<AppProps, AppState>{

    private simulation: SimulationDate;
    private forecastDateBuilder: ForecastDateBuilder;
    private simulationRan: boolean;

    constructor(props: AppProps) {
        super(props);
        this.simulationRan = false;
        this.state = {
            simulationConfig: new SimulationConfig([5, 6, 7, 1, 5], ThroughputFrequency.Day, new Date(), 38, new Date(), 100),
            simulationDateResults: new Array<SimulationResult>(),
            simulationItemsResults: new Array<SimulationResult>()
        };
    }

    render(): JSX.Element {
        return <MuiThemeProvider>
            <div>
                <Header cbLaunchSimulation={this.cbLaunchSimulation.bind(this)} />
                {this.simulationRan &&
                    <ResultsDisplay
                        simulationConfig={this.state.simulationConfig}
                        numberOfSimulations={this.simulation.NumberOfSimulations}
                        forecasts={this.forecastDateBuilder.Forecasts} />}
                {this.simulationRan &&
                    <SimulationChart SimulationResults={this.simulation.SimulationResults} />}
                {this.simulationRan &&             
                    <IconButton 
                        tooltip="Download your forecasts"
                        onTouchTap={this.buildForecastContent.bind(this)}
                        touch={true}
                    >
                        <GetAppIcon/> 
                    </IconButton>}
            </div>
        </MuiThemeProvider>
    }

    private buildForecastContent(e:any): void{

        let a = document.createElement('a');
        a.href = SimulationExporter.export(this.state.simulationConfig, this.simulation.SimulationResults) as string;
        a.target = '_blank';
        a.download = SimulationExporter.createFilename(this.state.simulationConfig) as string;

        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);  
        }, 0);         
    }

    private cbLaunchSimulation(data: SimulationConfig): void {
        this.simulation = new SimulationDate(
            data.StartDate,
            data.NumberOfDays,
            1000,
            data.ThroughputFrequency);
        this.simulation.HistoricalThroughput = data.HistoricalThroughput;
        this.simulation.execute();

        this.forecastDateBuilder = new ForecastDateBuilder(this.simulation.SimulationResults, data.NumberOfDays);
        this.forecastDateBuilder.createForecast();

        this.state.simulationConfig = data;
        this.state.simulationDateResults = this.simulation.SimulationResults;
        this.simulationRan = true;
        this.setState(this.state);
    }
}

