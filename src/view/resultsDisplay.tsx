/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Forecast } from "../model/forecast";
import { ForecastDate } from "../model/forecastDate";
import { ForecastItems } from "../model/forecastItems";
import { SimulationConfig } from "../model/simulationConfig";

import Slider from "material-ui/Slider";
import * as moment from "moment";

export interface ResultsProps {
    simulationConfig: SimulationConfig,
    dateForecasts: ForecastDate[],
    itemsForecasts: ForecastItems[],
    orderedAsc: boolean,
    cbDaysChanged: (numberOfDays: number) => void,
    cbItemsChanged: (numberOfItems: number) => void
}

export interface ResultsState {
    numberOfDays: number,
    numberOfItems: number
}
export class ResultsDisplay extends React.Component<ResultsProps, ResultsState> {

    constructor(props: ResultsProps) {
        super(props);
        this.state = { numberOfDays: 25, numberOfItems: 100 };
    }

    render(): JSX.Element {

        if (this.isForecastsEmpty())
            return this.displayEmptyForecast();
        else
            return this.displayForecasts();
    }

    private createSection(forecasts:Array<Forecast>): JSX.Element[]{
        let orderedForecasts = this.orderForecasts(forecasts);

        return orderedForecasts.map((currentForecast, index, arr) =>
            <li key={currentForecast.Percentile.value}>{currentForecast.toString()}</li>
        );
    }

    private displayForecasts(): JSX.Element {

        // This is just here to make code easier to read
        let simulationConfig = this.props.simulationConfig;

        const dateSection = this.createSection(this.props.dateForecasts);
        const itemsSection = this.createSection(this.props.itemsForecasts);

        return <div>
            <h2>Forecasts for delivering on {this.dateToString(simulationConfig.DeliveryDate)} ({simulationConfig.NumberOfDays} days)</h2>
            <h3>({simulationConfig.NumberOfSimulations} simulations were ran)</h3>
            <ul>{dateSection}</ul>
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
            <h2>Forecasts for delivering {simulationConfig.NumberOfItems} items</h2>
            <h3>({simulationConfig.NumberOfSimulations} simulations were ran)</h3>
            <ul>{itemsSection}</ul>
            <div>Set the number of items
                    <Slider
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfItems}
                    value={this.state.numberOfItems}
                    step={1}
                    onChange={this.handleItemsSlider.bind(this)}
                    style={{ width: 350 }}
                    max={200}
                />
            </div>

        </div>;
    }

    private displayEmptyForecast(): JSX.Element {
        return <div><h2>No forecasts generated yet</h2></div>;
    }

    private isForecastsEmpty(): boolean {
        return (this.props.dateForecasts.length == 0 &&
                this.props.itemsForecasts.length == 0)
    }

    private handleDaysSlider(event: any, value: any): void {
        this.state.numberOfDays = value;
        this.props.cbDaysChanged(value);
    }

    private handleItemsSlider(event: any, value: any): void {
        this.state.numberOfItems = value;
        this.props.cbItemsChanged(value);
    }

    private dateToString(dateToConvert: Date): string {
        return moment(dateToConvert).format("dddd, MMMM Do YYYY");
    }

    private orderForecasts(forecasts:Array<Forecast>): Array<Forecast> {
        let checkOne = (f1: Forecast, f2: Forecast) => { return f1.Percentile.value > f2.Percentile.value };
        let checkTwo = (f1: Forecast, f2: Forecast) => { return f1.Percentile.value < f2.Percentile.value };

        let conditionOne = this.props.orderedAsc ? checkTwo : checkOne;
        let conditionTwo = this.props.orderedAsc ? checkOne : checkTwo;

        return forecasts.sort((n1: Forecast, n2: Forecast) => {
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
        dateForecasts: new Array<ForecastDate>(0),
        itemsForecasts: new Array<ForecastItems>(0),
        orderedAsc: false,
        cbDaysChanged: (numberOfDays: number) => { },
        cbItemsChanged: (numberOfItems: number) => { },
    };
}