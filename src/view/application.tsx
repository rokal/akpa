/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ForecastDate } from "../model/forecastdate";
import { ForecastItems } from "../model/forecastitems";
import { SimulationConfig} from "../model/simulationConfig";
import { SimulationController } from "../model/simulationController";
import { SimulationResult } from "../model/simulationResult";
import { ThroughputFrequency } from "../model/throughputFrequencyEnum";
import { ProjectEvent, ExistingProjectEvent, NewProjectEvent} from "./projectEvents";

import { NewProjectDialog } from "./newProjectDialog";
import { ExistingProjectDialog } from "./existingProjectDialog";
import { ResultsDisplay } from "./resultsDisplay";

import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import GetAppIcon from "material-ui/svg-icons/action/get-app";

// This fix the touch tap event which is not currently supported
// in the official React release. It will be removed one day when
// React integrates it
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export interface AppProps { }
interface AppState {
    applicationState: boolean,
    simulationConfig: SimulationConfig,
    simulationDateResults: Array<SimulationResult>,
    simulationItemsResults?: Array<SimulationResult>,
    dateForecasts:Array<ForecastDate>,
    itemsForecasts:Array<ForecastItems>    
}
export class Application extends React.Component<AppProps, AppState>{

    private simController:SimulationController;

    constructor(props: AppProps) {
        super(props);
        this.simController = new SimulationController();
        this.setInitialValues();
    }

    render(): JSX.Element {
        return <MuiThemeProvider>
            <div>                
                <AppBar
                    showMenuIconButton={false}
                    title="Determining potential delivery dates of your software project" />
                <div className="buttons">
                    <RaisedButton
                        primary={true}
                        onTouchTap={this.handleBtnNewProject.bind(this)}
                        label="New Project"
                    />
                    <RaisedButton
                        primary={true}
                        onTouchTap={this.handleBtnExistingProject.bind(this)}
                        label="Existing Project"
                    />                
                </div>
                <Divider/>
                <NewProjectDialog 
                    visible={this.state.applicationState}
                    throughputFrequency={ThroughputFrequency.Day}
                    cbHandleConfiguration={this.handleBtnCreateForecasts.bind(this)}
                    />
                <ExistingProjectDialog 
                    visible={!this.state.applicationState}
                    cbHandleConfiguration={this.handleBtnCreateForecasts.bind(this)}
                />
                {/*<RaisedButton
                    label="Create forecasts"
                    onTouchTap={this.handleBtnCreateForecasts.bind(this)}
                    containerElement="label"                
                />*/}
                <Divider/>
                <ResultsDisplay
                    simulationConfig={this.state.simulationConfig}
                    dateForecasts={this.state.dateForecasts}
                    itemsForecasts={this.state.itemsForecasts}
                    orderedAsc={false}
                    cbDaysChanged={this.cbDaysChanged.bind(this)}
                    cbItemsChanged={this.cbItemsChanged.bind(this)}
                    />                                    
            </div>
        </MuiThemeProvider>
    }

    private handleBtnCreateForecasts(event:ProjectEvent): void {

        if (this.state.applicationState){
            // Cast & assign the configuration from the new project panel
            let newProjectEvent = event as NewProjectEvent;
            this.simController.SimulationConfig = newProjectEvent.Config;
        }
        else{
            // Cast and build the configuration object
            let existingProjectEvent = event as ExistingProjectEvent;
            this.simController.StartDate = new Date();
            this.simController.buildValidDates(existingProjectEvent.Results)
            this.simController.buildThroughputs();
            //this.state.imporErrors = this.simController.getImportErrors();
        }
    
        // Call the two simulation object (Date & Items)
        this.state.dateForecasts = this.simController.createDateSimulationForExistingProject();
        this.state.itemsForecasts = this.simController.createItemsSimulationForExistingProject();
        this.setState(this.state);
    }

    private cbDaysChanged(numberOfDays: number): void {
        this.simController.NumberOfDays = numberOfDays;
        this.state.simulationConfig.StartDate = this.simController.StartDate;
        this.state.simulationConfig.NumberOfDays = this.simController.NumberOfDays;
        this.state.dateForecasts = this.simController.createDateSimulationForExistingProject();
        this.setState(this.state);
    }

    private cbItemsChanged(numberOfItems: number): void {
        this.simController.NumberOfItems = numberOfItems;
        this.state.simulationConfig.NumberOfItems = numberOfItems;
        this.state.itemsForecasts = this.simController.createItemsSimulationForExistingProject();
        this.setState(this.state);
    }

    private handleBtnNewProject(e:any):void {
        this.state.applicationState = true;
        this.setState(this.state);
    }

    private handleBtnExistingProject(e:any):void {
        this.state.applicationState = false;
        this.setState(this.state);
    }

    private setInitialValues(): void {
        this.state = {
            applicationState: true,
            simulationConfig: SimulationConfig.Empty,
            simulationDateResults: new Array<SimulationResult>(0),
            simulationItemsResults: new Array<SimulationResult>(0),
            dateForecasts: new Array<ForecastDate>(0),
            itemsForecasts: new Array<ForecastItems>(0)
        };
    }
}