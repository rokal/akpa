/// <reference path="../../node_modules/@types/react/index.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />
/// <reference path="../../typings/globals/moment/index.d.ts" />

import * as React from "react";

import { ProjectEvent, NewProjectEvent } from "./projectEvents";
import { SimulationConfig } from "../model/simulation/simulationConfig";
import { ThroughputFrequency } from "../model/simulation/throughputFrequencyEnum";
import { Utilities } from "../utilities";

import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import { cyan500, red500 } from 'material-ui/styles/colors';
import * as moment from "moment";

export interface NewProjectPanelProps {
    visible: boolean;
    throughputFrequency: ThroughputFrequency;
    cbHandleConfiguration: (event: ProjectEvent) => void;
}

export interface NewProjectPanelState {
    minValue: string | number | undefined,
    maxValue: string | number | undefined,
    throughputFrequency: ThroughputFrequency;
    minValueErrorText: String,
    minValueErrorStyle: React.CSSProperties,
    maxValueErrorText: String,
    maxValueErrorStyle: React.CSSProperties,
    deliveryDate: Date | undefined,
    numberOfDays: number;
    numberOfItems?: string | number | undefined,
    numItemsErrorText: String,
    numItemsErrorStyle: React.CSSProperties
}

export class NewProjectPanel extends React.Component<NewProjectPanelProps, NewProjectPanelState>{

    constructor(props: NewProjectPanelProps) {
        super(props);
        this.setInitialState();
    }

    render(): JSX.Element {

        if (!this.props.visible)
            return <div></div>

        return <div>
            <div>
                <p>Select the throughput frequency of your team:</p>
                <SelectField
                    value={this.state.throughputFrequency}
                    autoWidth={true}
                    onChange={this.handleChangeFrequency.bind(this)}
                >
                    <MenuItem value={ThroughputFrequency.Week} primaryText="week" />
                    <MenuItem value={ThroughputFrequency.Day} primaryText="day" />
                    <MenuItem value={ThroughputFrequency.Hour} primaryText="hour" />
                </SelectField>
            </div>
            <div>
                <p style={this.styleNoMargin}>Enter the minimal and maximal number of features your team will do per {this.convertThroughput()}:</p>
                <TextField
                    id="minValueTextField"
                    value={this.state.minValue}
                    onChange={this.handleMinValueChange.bind(this)}
                    hintText="Enter a value greater than 0"
                    errorText={this.state.minValueErrorText}
                    errorStyle={this.state.minValueErrorStyle}
                    underlineFocusStyle={this.styleValid}
                />
                <div className="spacer"></div>
                <TextField
                    id="maxValueTextField"
                    value={this.state.maxValue}
                    onChange={this.handleMaxValueChange.bind(this)}
                    hintText="Enter a value smaller than 100"
                    errorText={this.state.maxValueErrorText}
                    errorStyle={this.state.maxValueErrorStyle}
                    underlineFocusStyle={this.styleValid}
                />
            </div>                
            <div>
                <p>Select the expected delivery date:</p>
                <DatePicker
                    value={this.state.deliveryDate}
                    minDate={this.tomorrow()}
                    onChange={this.handleDateChange.bind(this)}
                    hintText="Click here to choose a date"
                />
                <p>Select the number of items remaining in your backlog:</p>
                <TextField
                    id="numItems"
                    value={this.state.numberOfItems}
                    onChange={this.handleNumItemsChange.bind(this)}
                    hintText="Enter a value greater than 0"
                    errorText={this.state.numItemsErrorText}
                    errorStyle={this.state.numItemsErrorStyle}
                    underlineFocusStyle={this.styleValid}
                />
            </div>
            <div className="forecastButton">
                <RaisedButton
                    buttonStyle={this.styleBtnBoxForecast}
                    labelStyle={this.styleBtnLabelForecast}
                    label="Create forecasts"
                    onTouchTap={this.handleBtnCreateForecast.bind(this)} 
                />
            </div>
            
        </div>;
    }

    private handleMinValueChange(e: any): void {
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger) {
            let range = Utilities.validateInRange(0, 0, output.value as number, this.state.maxValue as number, 100);
            this.state.minValue = output.value;
            this.state.minValueErrorText = range.isInRange ? this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput() : range.errorMessage;
            this.state.minValueErrorStyle = range.isInRange ? this.styleValid : this.styleError;
        }
        else {
            this.state.minValue = e.target.value;
            if (e.target.value.length == 0) {
                this.state.minValueErrorText = this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput();
                this.state.minValueErrorStyle = this.styleValid;
            }
            else {
                this.state.minValueErrorText = "Please enter a numeric value";
                this.state.minValueErrorStyle = this.styleError;
            }
        }

        this.setState(this.state);
    }

    private handleMaxValueChange(e: any): void {
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger) {
            let range = Utilities.validateInRange(0, this.state.minValue as number, output.value as number, 100, 100);
            this.state.maxValue = output.value;
            this.state.maxValueErrorText = range.isInRange ? this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput() : range.errorMessage;
            this.state.maxValueErrorStyle = range.isInRange ? this.styleValid : this.styleError;
        }
        else {
            this.state.maxValue = e.target.value;
            if (e.target.value.length == 0) {
                this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput();
                this.state.maxValueErrorStyle = this.styleValid;
            }
            else {
                this.state.minValueErrorText = "Please enter a numeric value";
                this.state.minValueErrorStyle = this.styleError;
            }
        }

        this.setState(this.state);
    }

    private handleChangeFrequency(event: any, key: number, value: any): void {
        this.state.throughputFrequency = value;
        if (this.state.minValueErrorStyle != this.styleError)
            this.state.minValueErrorText = this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput();

        if (this.state.maxValueErrorStyle != this.styleError)
            this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput();

        this.setState(this.state);
    }

    private handleDateChange(event: any, date: Date): void {
        this.state.deliveryDate = date;
        this.setState(this.state);
    }

    private handleNumItemsChange(e: any): void {
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger) {
            let range = Utilities.validateInRange(0, 0, output.value as number, 1000, 1000);
            this.state.numberOfItems = output.value;
            this.state.numItemsErrorText = range.isInRange ? this.DEFAULT_NUM_ITEMS_TEXTFIELD : range.errorMessage;
            this.state.numItemsErrorStyle = range.isInRange ? this.styleValid : this.styleError;
        }
        else {
            this.state.numberOfItems = e.target.value;
            if (e.target.value.length == 0) {
                this.state.numItemsErrorText = this.DEFAULT_NUM_ITEMS_TEXTFIELD;
                this.state.numItemsErrorStyle = this.styleValid;
            }
            else {
                this.state.numItemsErrorText = "Please enter a numeric value";
                this.state.numItemsErrorStyle = this.styleError;
            }
        }

        this.setState(this.state);
    }

    private handleBtnCreateForecast(event: any): void {
        let now = moment(new Date());
        let futur = moment(this.state.deliveryDate as Date);

        let config = new SimulationConfig(
            Utilities.generateHistoricalThroughput(
                this.state.minValue as number,
                this.state.maxValue as number,
                10),
            this.state.throughputFrequency,
            new Date(),
            futur.diff(now, 'days') + 1,
            this.state.numberOfItems as number,
            1000);

        if (this.props.cbHandleConfiguration != undefined)
            this.props.cbHandleConfiguration(new NewProjectEvent(config));
    }

    private convertThroughput(): String {
        if (this.state.throughputFrequency == 0)
            return "hour"
        else if (this.state.throughputFrequency == 1)
            return "day"
        else
            return "week"
    }

    private tomorrow(): Date {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    private setInitialState(): void {
        this.state = {
            minValue: undefined,
            maxValue: undefined,
            throughputFrequency: this.props.throughputFrequency,
            minValueErrorText: "",
            minValueErrorStyle: this.styleValid,
            maxValueErrorText: "",
            maxValueErrorStyle: this.styleValid,
            deliveryDate: undefined,
            numberOfDays: 30,
            numberOfItems: undefined,
            numItemsErrorText: this.DEFAULT_NUM_ITEMS_TEXTFIELD,
            numItemsErrorStyle: this.styleValid
        };

        this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput();
        this.state.minValueErrorText = this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput();
    }

    private readonly styleNoMargin: React.CSSProperties = {
        marginTop:"0em"
    }

    private readonly styleValid: React.CSSProperties = {
        color:cyan500
    }

    private readonly styleError:React.CSSProperties = {
        color:red500
    }

    private readonly styleBtnBoxForecast: React.CSSProperties = {
        backgroundColor: "#079107",
    }

    private readonly styleBtnLabelForecast: React.CSSProperties = {
        color: "#FFFFFF"
    }

    private readonly DEFAULT_MIN_VALUE_TEXTFIELD = "The minimal features produced per ";
    private readonly DEFAULT_MAX_VALUE_TEXTFIELD = "The maximum features produced per ";
    private readonly DEFAULT_NUM_ITEMS_TEXTFIELD = "The number of items you have to deliver";
}
