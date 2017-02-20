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
import { cyan500, green600, amber800, red800} from "material-ui/styles/colors";
import * as moment from "moment";
import { Percentile } from "../model/percentile";

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

    private createDateSection(forecasts:Array<Forecast>): JSX.Element{
        let orderedForecasts = this.orderForecasts(forecasts);

        const items = orderedForecasts.map((forecast, index, arr) => {
            return <div className="result" key={index}>
                <p className="result"><span className="percentileNumber" style={this.pickColor(forecast.Percentile)}>{forecast.NumberOfItemsCompleted}</span> items</p>
                <p className="resultConfidence">{forecast.Percentile.toString()} confidence</p>
            </div>
            });

        return <div>
                {items}                                                  
               </div>
    }

    private pickColor(percentile:Percentile):any{
        if (percentile.value >= 0.8)
            return this.styles.percentile.green;
        else if (percentile.value >= 0.5 && percentile.value < 0.8)
        return this.styles.percentile.yellow;
            else
            return this.styles.percentile.red;
    }

    readonly styles = {
        percentile:{            
            green:{color:green600},
            yellow:{color:amber800},
            red:{color:red800}
        },
        slider:{
            margin:"2px",
            width:"350px"
        }        
    }

    private createItemsSection(forecasts:Array<Forecast>): JSX.Element{
        let orderedForecasts = this.orderForecasts(forecasts);

        const items = orderedForecasts.map((forecast, index, arr) => {
            return <div key={index} className="result">
                <p className="result"><span className="percentileNumber" style={this.pickColor(forecast.Percentile)}>{forecast.NumberOfDays}</span> days</p>
                <p className="resultConfidence">{forecast.Percentile.toString()} confidence</p>
            </div>
            });

        return <div>
                {items}                                                  
               </div>
    }

    private displayForecasts(): JSX.Element {

        // This is just here to make code easier to read
        let simulationConfig = this.props.simulationConfig;

        const dateSection = this.createDateSection(this.props.dateForecasts);
        const itemsSection = this.createItemsSection(this.props.itemsForecasts);

        return <div>
            <h1>Forecasts</h1>
            <h2>Delivery date on {this.dateToString(simulationConfig.DeliveryDate)}</h2>
            <div>Number of days: <span className="variableNumber">{this.state.numberOfDays}</span>
                    <Slider
                    sliderStyle={this.styles.slider}
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfDays}
                    value={this.state.numberOfDays}
                    step={1}
                    onChange={this.handleDaysSlider.bind(this)}
                    max={100}
                />
            <div>{dateSection}</div>                
            </div>
            <h2>Delivering the next {simulationConfig.NumberOfItems} items from your backlog</h2>            
            <div>Number of items: <span className="variableNumber">{this.state.numberOfItems}</span>
                    <Slider
                    sliderStyle={this.styles.slider}
                    min={10}
                    defaultValue={this.props.simulationConfig.NumberOfItems}
                    value={this.state.numberOfItems}
                    step={1}
                    onChange={this.handleItemsSlider.bind(this)}
                    max={200}
                />
            <div>{itemsSection}</div>                
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