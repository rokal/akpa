/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/modules/react-tap-event-plugin/index.d.ts" />
/// <reference path="../../node_modules/@types/google.analytics/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { CycleTime } from "../model/cycleTime";
import { ExcelImportResult } from "../model/excelImportResult";
import { ForecastDate } from "../model/forecast/forecastDate";
import { ForecastItems } from "../model/forecast/forecastItems";
import { SimulationConfig} from "../model/simulation/simulationConfig";
import { SimulationController } from "../model/simulation/simulationController";
import { ThroughputFrequency } from "../model/simulation/throughputFrequencyEnum";
import { ProjectEvent, ExistingProjectEvent, NewProjectEvent} from "./projectEvents";

import { CycleTimeChart} from "./cycleTimeChart";
import { NewProjectPanel } from "./newProjectPanel";
import { ExistingProjectPanel } from "./existingProjectPanel";
import { ResultsDisplay } from "./resultsDisplay";
import { ExcelImportErrorList } from "./excelImportErrorList";

import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";

// This fix the touch tap event which is not currently supported
// in the official React release. It will be removed one day when
// React integrates it
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export interface AppProps { }
interface AppState {
    applicationState: boolean,
    simulationConfig: SimulationConfig,
    dateForecasts:Array<ForecastDate>,
    itemsForecasts:Array<ForecastItems>,
    cycleTimes:Array<CycleTime>,
    importResults:Array<ExcelImportResult>
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
                <div className="headerButtons">
                    <RaisedButton
                        onTouchTap={this.handleBtnNewProject.bind(this)}
                        className="toto"
                        label="New Project"
                        labelColor="#FFFFFF"
                        backgroundColor={this.selectButtonBackground("N")}
                        style={this.marginStyle}                        
                    />
                    <RaisedButton
                        onTouchTap={this.handleBtnExistingProject.bind(this)}
                        label="Existing Project"
                        labelColor="#FFFFFF"
                        backgroundColor={this.selectButtonBackground("E")}
                        style={this.marginStyle}
                    />                
                </div>
                <Divider/>
                <div className="mainSection">
                    <NewProjectPanel 
                        visible={this.state.applicationState}
                        throughputFrequency={ThroughputFrequency.Day}
                        cbHandleConfiguration={this.handleBtnCreateForecasts.bind(this)}
                        />
                    <ExistingProjectPanel 
                        visible={!this.state.applicationState}
                        cbHandleConfiguration={this.handleBtnCreateForecasts.bind(this)}
                    />
                </div>
                <Divider/>
                <div className="mainSection">
                <ResultsDisplay
                    simulationConfig={this.state.simulationConfig}
                    dateForecasts={this.state.dateForecasts}
                    itemsForecasts={this.state.itemsForecasts}
                    orderedAsc={false}
                    cbDaysChanged={this.cbDaysChanged.bind(this)}
                    cbItemsChanged={this.cbItemsChanged.bind(this)}
                    /> 
                    {/*<CycleTimeChart cycleTimes={this.state.cycleTimes}/>                                   */}
                <ExcelImportErrorList importResults={this.state.importResults} />
                </div>                    
            <div className="copyright">March 2017 - Version 0.2 - Copyright 2017 - All rights reserved</div>
            </div>            
        </MuiThemeProvider>
    }

    private handleBtnCreateForecasts(event:ProjectEvent): void {
        ga("send", "event", "Button", "Click create forecasts");

        if (this.state.applicationState){
            // Cast & assign the configuration from the new project panel
            let newProjectEvent = event as NewProjectEvent;
            this.state.simulationConfig = this.simController.SimulationConfig = newProjectEvent.Config;
        }
        else{
            // Cast and build the configuration object
            let existingProjectEvent = event as ExistingProjectEvent;
            this.simController.SimulationConfig = this.state.simulationConfig;
            this.simController.SimulationConfig.ThroughputFrequency = ThroughputFrequency.Day;
            this.simController.StartDate = new Date();
            this.simController.buildValidDates(existingProjectEvent.Results)
            this.simController.buildThroughputs();
            this.state.simulationConfig = this.simController.SimulationConfig;
            this.state.cycleTimes = this.simController.buildCycleTimes();
            this.state.importResults = this.simController.getImportErrors();
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
        ga("send", "event", "Button", "Clicked new project");

        this.state.applicationState = true;
        this.setState(this.state);
    }

    private handleBtnExistingProject(e:any):void {
        ga("send", "event", "Button", "Clicked existing project");
        
        this.state.applicationState = false;
        this.setState(this.state);
    }

    private selectButtonBackground(target:string):string{            
        if (( this.state.applicationState && target == "N") ||
            (!this.state.applicationState && target == "E"))
            return this.ACTIVE_BUTTON_BACKGROUND_COLOR;
        else    
            return this.INACTIVE_BUTTON_BACKGROUND_COLOR;
    }

    private setInitialValues(): void {
        this.state = {
            applicationState: true,
            simulationConfig: SimulationConfig.Empty,
            dateForecasts: new Array<ForecastDate>(0),
            itemsForecasts: new Array<ForecastItems>(0),
            cycleTimes: new Array<CycleTime>(0),
            importResults: new Array<ExcelImportResult>(0)
        };
    }

    private readonly marginStyle: React.CSSProperties = {
        margin: "6px"
        }

    private readonly ACTIVE_BUTTON_BACKGROUND_COLOR = "#FF7A00";
    private readonly INACTIVE_BUTTON_BACKGROUND_COLOR = "#00BCD4";    
}
