/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";

import { Forecast } from "../model/forecast";
import { ForecastDate } from "../model/forecastDate";
import { ForecastItems } from "../model/forecastItems";
import { Percentile } from "../model/percentile";
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
        this.state = {
            numberOfDays: props.simulationConfig.NumberOfDays,
            numberOfItems: props.simulationConfig.NumberOfItems
        };
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
        this.state.numberOfDays = simulationConfig.NumberOfDays;
        this.state.numberOfItems = simulationConfig.NumberOfItems;

        const forecastsTitle = this.FORECASTS_TITLE;
        const clearFixDiv = this.CLEAR_FIX_DIV;
        const dateSection = this.createDateSection(this.props.dateForecasts);
        const itemsSection = this.createItemsSection(this.props.itemsForecasts);

        return <div>
            {forecastsTitle}
            <h3>Delivery date on {this.dateToString(simulationConfig.DeliveryDate)}</h3>
            <div>
                <Slider
                    sliderStyle={this.sliderStyle}
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfDays}
                    value={this.state.numberOfDays}
                    step={1}
                    onChange={this.handleDaysSlider.bind(this)}
                    max={100}
                />
                <div className="floatLeft">Number of days:
                    <span className="variableNumber">{this.state.numberOfDays}</span>
                </div>
                {clearFixDiv}
                <div>{dateSection}</div>
            </div>
            <h3>Delivering the next {simulationConfig.NumberOfItems} items from your backlog</h3>
            <div>
                <Slider
                    sliderStyle={this.sliderStyle}
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfItems}
                    value={this.state.numberOfItems}
                    step={1}
                    onChange={this.handleItemsSlider.bind(this)}
                    max={200}
                />
                <div className="floatLeft">Number of items:
                    <span className="variableNumber">{this.state.numberOfItems}</span>
                </div>
                {clearFixDiv}
                <div>{itemsSection}</div>
            </div>

        </div>;
    }

    private createDateSection(forecasts: Array<Forecast>): JSX.Element {
        let orderedForecasts = this.orderForecasts(forecasts);

        const clearFixDiv = this.CLEAR_FIX_DIV;
        const items = orderedForecasts.map((forecast, index, arr) => {
            return <div className="result" key={index}>
                <p style={this.getBorderStyle(forecast.Percentile)}>
                    <span className="percentileNumber" style={this.getLabelColor(forecast.Percentile)}>{forecast.NumberOfItemsCompleted}</span>
                    <span className="items"> items</span>
                    <span className="resultConfidence">{forecast.Percentile.toString()} confidence</span>
                </p>
                {clearFixDiv}
            </div>
        });

        return <div>
            {items}
        </div>
    }

    private createItemsSection(forecasts: Array<Forecast>): JSX.Element {
        let orderedForecasts = this.orderForecasts(forecasts);

        const clearFixDiv = this.CLEAR_FIX_DIV;
        const items = orderedForecasts.map((forecast, index, arr) => {
            return <div className="result" key={index}>
                <p style={this.getBorderStyle(forecast.Percentile)}>
                    <span className="percentileNumber" style={this.getLabelColor(forecast.Percentile)}>{forecast.NumberOfDays}</span>
                    <span className="items"> days</span>
                    <span className="resultConfidence">{forecast.Percentile.toString()} confidence</span>
                </p>
                {clearFixDiv}
            </div>
        });

        return <div>
            {items}
        </div>
    }

    private getBorderStyle(percentile: Percentile): React.CSSProperties {
        let value: React.CSSProperties = {
            float:this.borderLeft.float,
            borderLeftStyle:this.borderLeft.borderLeftStyle,
            borderLeftWidth:this.borderLeft.borderLeftWidth,
            borderLeftColor:this.pickColor(percentile)
        };
        
        return value;
    }

    private getLabelColor(percentile: Percentile): React.CSSProperties {
        let value: React.CSSProperties = {
            color: this.pickColor(percentile)};

        return value;
    }

    private pickColor(percentile: Percentile): string {
        if (percentile.value >= 0.8)
            return this.COLOR_GREEN;
        else if (percentile.value >= 0.5 && percentile.value < 0.8)
            return this.COLOR_YELLOW;
        else
            return this.COLOR_RED;
    }

    private displayEmptyForecast(): JSX.Element {

        const forecastsTitle = this.FORECASTS_TITLE;

        return <div>
            {forecastsTitle}
            <h3>No forecasts generated yet</h3>
        </div>;
    }

    private isForecastsEmpty(): boolean {
        return (this.props.dateForecasts.length == 0 &&
            this.props.itemsForecasts.length == 0)
    }

    private handleDaysSlider(event: any, value: any): void {
        this.props.cbDaysChanged(value);
    }

    private handleItemsSlider(event: any, value: any): void {
        this.props.cbItemsChanged(value);
    }

    private dateToString(dateToConvert: Date): string {
        return moment(dateToConvert).format(this.DISPLAY_DATE_FORMAT);
    }

    private orderForecasts(forecasts: Array<Forecast>): Array<Forecast> {
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

    private readonly borderLeft: React.CSSProperties = {
        float: "left",
        borderLeftStyle: "solid",
        borderLeftWidth: "1em"
    };

    private readonly sliderStyle: React.CSSProperties = {
        float: "left",
        marginTop: "1em",
        marginBottom: "1em",
        marginRight: "1em",
        width: "350px"
    }

    private readonly COLOR_RED = "#c62828";
    private readonly COLOR_GREEN = "#43a047";
    private readonly COLOR_YELLOW = "#ff8f00";
    private readonly FORECASTS_TITLE = <h1>Forecasts</h1>;
    private readonly CLEAR_FIX_DIV = <div className="clearfix"></div>;
    private readonly DISPLAY_DATE_FORMAT = "dddd, MMMM Do YYYY";
}