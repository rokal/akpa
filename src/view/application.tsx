/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimulationDate } from "../model/simulationDate";
import { ForecastDateBuilder } from "../model/forecastDateBuilder";
import { SimulationResult } from "../model/simulationResult";
import { SimulationExporter } from "../model/io/simulationExporter";
import { ThroughputFrequency } from "../model/throughputFrequencyEnum";
import { SimulationConfig } from "../model/simulationConfig";

import { Header } from "./header";
import { ResultsDisplay } from "./resultsDisplay";
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
            simulationConfig: new SimulationConfig([], ThroughputFrequency.Day, new Date(), 38, 100, 1000),
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
                        forecasts={this.forecastDateBuilder.Forecasts}
                        orderedAsc={false}
                        cbDaysChanged={(data:number) => {}} />}
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

    private cbLaunchSimulation(config: SimulationConfig): void {
        this.simulation = new SimulationDate(config);
        this.simulation.execute();

        this.forecastDateBuilder = new ForecastDateBuilder(this.simulation.SimulationResults, config.NumberOfDays);
        this.forecastDateBuilder.createForecast();

        this.state.simulationConfig = config;
        this.state.simulationDateResults = this.simulation.SimulationResults;
        this.simulationRan = true;
        this.setState(this.state);
    }
}

