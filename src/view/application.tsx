/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { CycleTime } from "../model/cycleTime";
import { ForecastDate } from "../model/forecastDate";
import { ForecastItems } from "../model/forecastItems";
import { SimulationConfig} from "../model/simulationConfig";
import { SimulationController } from "../model/simulationController";
import { ThroughputFrequency } from "../model/throughputFrequencyEnum";
import { ProjectEvent, ExistingProjectEvent, NewProjectEvent} from "./projectEvents";

import { CycleTimeChart} from "./cycleTimeChart";
import { NewProjectPanel } from "./newProjectPanel";
import { ExistingProjectPanel } from "./existingProjectPanel";
import { ResultsDisplay } from "./resultsDisplay";

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
    cycleTimes:Array<CycleTime>
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
                </div>                    
            </div>
        </MuiThemeProvider>
    }

    private handleBtnCreateForecasts(event:ProjectEvent): void {

        if (this.state.applicationState){
            // Cast & assign the configuration from the new project panel
            let newProjectEvent = event as NewProjectEvent;
            this.state.simulationConfig = this.simController.SimulationConfig = newProjectEvent.Config;
        }
        else{
            // Cast and build the configuration object
            let existingProjectEvent = event as ExistingProjectEvent;
            this.simController.SimulationConfig = this.state.simulationConfig;
            this.simController.StartDate = new Date();
            this.simController.buildValidDates(existingProjectEvent.Results)
            this.simController.buildThroughputs();
            this.state.simulationConfig = this.simController.SimulationConfig;
            this.state.cycleTimes = this.simController.buildCycleTimes();
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
            cycleTimes: new Array<CycleTime>(0)
        };
    }

    private readonly marginStyle: React.CSSProperties = {
        margin: "6px"
        }

    private readonly ACTIVE_BUTTON_BACKGROUND_COLOR = "#FF7A00";
    private readonly INACTIVE_BUTTON_BACKGROUND_COLOR = "#00BCD4";
    
}
