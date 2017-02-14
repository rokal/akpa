/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Forecast } from "../model/forecast";
import { SimulationConfig } from "../model/simulationConfig";

import Slider from "material-ui/Slider";
import * as moment from "moment";

export interface ResultsProps {
    simulationConfig: SimulationConfig,
    forecasts: Forecast[],
    orderedAsc: boolean,
    cbDaysChanged: (numberOfDays: number) => void
}

export interface ResultsState {
    numberOfDays: number
}
export class ResultsDisplay extends React.Component<ResultsProps, ResultsState> {

    constructor(props: ResultsProps) {
        super(props);
        this.state = { numberOfDays: 25 };
    }

    render(): JSX.Element {

        if (this.isForecastsEmpty())
            return this.displayEmptyForecast();
        else
            return this.displayForecasts();
    }

    private displayForecasts(): JSX.Element {

        // This is just here to make code easier to read
        let simulationConfig = this.props.simulationConfig;

        let orderedForecasts = this.orderForecasts();

        const listItems = orderedForecasts.map((currentForecast, index, arr) =>
            <li key={currentForecast.Percentile.value}>{currentForecast.toString()}</li>
        );

        return <div>
            <h2>Forecasts for delivering on {this.dateToString(simulationConfig.DeliveryDate)} ({simulationConfig.NumberOfDays} days)</h2>
            <h3>({simulationConfig.NumberOfSimulations} simulations were ran)</h3>
            <ul>{listItems}</ul>
            <div>Set the number of days
                    <Slider
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfDays}
                    value={this.state.numberOfDays}
                    step={1}
                    onChange={this.handleDaysSlider.bind(this)}
                    style={{ width: 350 }}
                    max={100}
                />
            </div>
        </div>;
    }

    private displayEmptyForecast(): JSX.Element {
        return <div><h2>No forecasts generated yet</h2></div>;
    }

    private isForecastsEmpty(): boolean {
        return (this.props.forecasts.length == 0)
    }

    private handleDaysSlider(event: any, value: any): void {
        this.state.numberOfDays = value;
        this.props.cbDaysChanged(value);
    }

    private dateToString(dateToConvert: Date): string {
        return moment(dateToConvert).format("dddd, MMMM Do YYYY");
    }

    private orderForecasts(): Array<Forecast> {
        let checkOne = (f1: Forecast, f2: Forecast) => { return f1.Percentile.value > f2.Percentile.value };
        let checkTwo = (f1: Forecast, f2: Forecast) => { return f1.Percentile.value < f2.Percentile.value };

        let conditionOne = this.props.orderedAsc ? checkTwo : checkOne;
        let conditionTwo = this.props.orderedAsc ? checkOne : checkTwo;

        return this.props.forecasts.sort((n1: Forecast, n2: Forecast) => {
            if (conditionOne(n1, n2))
                return -1;
            else if (conditionTwo(n1, n2))
                return 1;
            else
                return 0;
        });
    }

    public static defaultProps: ResultsProps = {
        simulationConfig: SimulationConfig.Empty,
        forecasts: new Array<Forecast>(0),
        orderedAsc: false,
        cbDaysChanged: (numberOfDays: number) => { }
    };
}