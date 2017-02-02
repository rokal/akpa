/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Forecast} from "../model/forecast";
import {SimulationConfig} from "../model/simulationConfig";

import * as moment from "moment";

export interface ResultsProps { 
    numberOfSimulations: number,
    simulationConfig: SimulationConfig | undefined,
    forecasts: Forecast[] | undefined; 
}

export class ResultsDisplay extends React.Component<ResultsProps, undefined> {

    render(): JSX.Element {

        if (this.isForecastsEmpty())
            return this.displayEmptyForecast();
        else
            return this.displayForecasts();
    }

    private displayForecasts(): JSX.Element{

        let forecasts = this.props.forecasts as Array<Forecast>;
        let simulationConfig = this.props.simulationConfig as SimulationConfig;

        const listItems = forecasts.map((currentForecast, index, arr) =>
            <li key={currentForecast.Percentile.value}>{currentForecast.toString()}</li>
        );

        return <div>
                <h2>Forecasts for delivering on {this.dateToString(simulationConfig.DeliveryDate)} ({simulationConfig.NumberOfDays} days)</h2>
                <h3>({this.props.numberOfSimulations} simulations were ran)</h3>
                <ul>{listItems}</ul> 
            </div>;        
    }

    private displayEmptyForecast(): JSX.Element{
        return <div>
            <h2>No forecasts generated yet</h2>
                </div>;
    }

    private isForecastsEmpty(): boolean{
        if (this.props.forecasts == undefined ||
            this.props.forecasts.length == 0){
            return true;
        }
        else
            return false;
    }

    private dateToString(dateToConvert:Date): string{
        let now = moment(dateToConvert);
        return now.format("dddd, MMMM Do YYYY");
    }
}