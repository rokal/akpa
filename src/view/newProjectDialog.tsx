/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />
/// <reference path="../../typings/globals/moment/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {ThroughputFrequency} from "../model/throughputFrequencyEnum";
import {SimulationConfig} from "../model/simulationConfig";
import {Utilities} from "../utilities";

import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import Divider from 'material-ui/Divider';
import FlatButton from "material-ui/FlatButton";
import {List, ListItem} from 'material-ui/List';
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import {cyan500, lightBlue500, red500} from 'material-ui/styles/colors';
import * as moment from "moment";

export interface NewProjectDialogProps {
    open:boolean;
    throughputFrequency:ThroughputFrequency;
    cbCloseDialog:(data: SimulationConfig | undefined) => void
}

export interface NewProjectDialogState {
    shown:boolean;
    minValue?:string | number | undefined,
    maxValue?:string | number | undefined,
    throughputFrequency:ThroughputFrequency;
    minValueErrorText:String,
    minValueErrorStyle:{color:String},
    maxValueErrorText:String,
    maxValueErrorStyle:{color:String},
    deliveryDate: Date,
    numberOfDays: number;
    numberOfItems?:string | number | undefined,
    numItemsErrorText:String,
    numItemsErrorStyle:{color:String}
}

export class NewProjectDialog extends React.Component<NewProjectDialogProps, NewProjectDialogState>{

    constructor(props: NewProjectDialogProps) {
        super(props);
        this.setInitialState();
    }

    render(): JSX.Element {
    
        const actions = [
        <FlatButton
            label="Cancel"
            primary={false}
            keyboardFocused={false}
            onTouchTap={this.handleBtnClose.bind(this)}
        />,
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleBtnOk.bind(this)}
        />,
        ];

        return <Dialog
                title="Enter theoretical values for your project"
                actions={actions}
                modal={true}
                autoScrollBodyContent={true}
                open={this.props.open}>

                <SelectField                    
                    floatingLabelText="Rate of delivering features is per"
                    value={this.state.throughputFrequency}
                    autoWidth={true}
                    onChange={this.handleChangeFrequency.bind(this)}
                >
                    <MenuItem value={ThroughputFrequency.Week} primaryText="week" />
                    <MenuItem value={ThroughputFrequency.Day} primaryText="day" />
                    <MenuItem value={ThroughputFrequency.Hour} primaryText="hour" />
                </SelectField>

                <br/>Enter the minimal and maximal number of features your team will do per {this.convertThroughput()}:

                <TextField
                    id="minValueTextField"
                    value={this.state.minValue}
                    onChange={this.handleMinValueChange.bind(this)}
                    floatingLabelFocusStyle={this.styles.validStyle}
                    floatingLabelText="Minimal number of features"
                    hintText="Enter a value greater than 0"
                    errorText={this.state.minValueErrorText}
                    errorStyle={this.state.minValueErrorStyle}
                    underlineFocusStyle={this.styles.validStyle}
                /> <br/>
                <TextField
                    id="maxValueTextField"
                    value={this.state.maxValue}
                    onChange={this.handleMaxValueChange.bind(this)}
                    floatingLabelFocusStyle={this.styles.validStyle}
                    floatingLabelText="Maximal number of features"
                    hintText="Enter a value smaller than 100"
                    errorText={this.state.maxValueErrorText}
                    errorStyle={this.state.maxValueErrorStyle}
                /> 
                <Divider/>
                <br/>
                <DatePicker
                    floatingLabelText="Expected delivery date by customer"
                    defaultDate={new Date()}
                    minDate={this.tomorrow()}
                    onChange={this.handleDateChange.bind(this)}
                />
                <TextField 
                    id="numItems" 
                    value={this.state.numberOfItems}                    
                    onChange={this.handleNumItemsChange.bind(this)}
                    floatingLabelFocusStyle={this.styles.validStyle}
                    floatingLabelText="Remaining features to deliver"
                    hintText="Enter a value greater than 0"
                    errorText={this.state.numItemsErrorText}
                    errorStyle={this.state.numItemsErrorStyle}
                    underlineFocusStyle={this.styles.validStyle}
                />
            </Dialog>;              
    }

    private handleMinValueChange(e:any): void{
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger)
        {
            let range = Utilities.validateInRange(0, 0, output.value as number, this.state.maxValue as number, 100);                                
            this.state.minValue = output.value;
            this.state.minValueErrorText = range.isInRange ? this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput() : range.errorMessage;
            this.state.minValueErrorStyle = range.isInRange ? this.styles.validStyle : this.styles.errorStyle;
        }
        else
        {
            this.state.minValue = e.target.value;
            if (e.target.value.length == 0) {
                this.state.minValueErrorText = this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput();
                this.state.minValueErrorStyle = this.styles.validStyle;                
            }
            else {                                
                this.state.minValueErrorText = "Please enter a numeric value";
                this.state.minValueErrorStyle = this.styles.errorStyle;
            }
        }
        
        this.setState(this.state);
    }

    private handleMaxValueChange(e:any): void{
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger)
        {
            let range = Utilities.validateInRange(0, this.state.minValue as number, output.value as number, 100, 100);                                
            this.state.maxValue = output.value;
            this.state.maxValueErrorText = range.isInRange ? this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput(): range.errorMessage;
            this.state.maxValueErrorStyle = range.isInRange ? this.styles.validStyle : this.styles.errorStyle;
        }
        else
        {
            this.state.maxValue = e.target.value;
            if (e.target.value.length == 0){            
                this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD+ this.convertThroughput();
                this.state.maxValueErrorStyle = this.styles.validStyle;                
            }
            else {                
                this.state.minValueErrorText = "Please enter a numeric value";
                this.state.minValueErrorStyle = this.styles.errorStyle;
            }
        }
        
        this.setState(this.state);
    }

    private handleChangeFrequency(event: any,key: number, value:any): void{
        this.state.throughputFrequency = value;
        if (this.state.minValueErrorStyle != this.styles.errorStyle)
            this.state.minValueErrorText = this.DEFAULT_MIN_VALUE_TEXTFIELD+ this.convertThroughput();

        if (this.state.maxValueErrorStyle != this.styles.errorStyle)
            this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD+ this.convertThroughput();

        this.setState(this.state);
    }

    private handleDateChange(event: any, date:Date): void{
        this.state.deliveryDate = date;
        this.setState(this.state);
    }

    private handleNumItemsChange(e:any): void{
        let output = Utilities.convertToInt(e.target.value);

        if (output.isInteger)
        {
            let range = Utilities.validateInRange(0, 0, output.value as number, 1000, 1000);                                
            this.state.numberOfItems = output.value;
            this.state.numItemsErrorText = range.isInRange ? this.DEFAULT_NUM_ITEMS_TEXTFIELD : range.errorMessage;
            this.state.numItemsErrorStyle = range.isInRange ? this.styles.validStyle : this.styles.errorStyle;
        }
        else
        {
            this.state.numberOfItems = e.target.value;
            if (e.target.value.length == 0){
                this.state.numItemsErrorText = this.DEFAULT_NUM_ITEMS_TEXTFIELD;
                this.state.numItemsErrorStyle = this.styles.validStyle;
            }
            else {
                this.state.numItemsErrorText = "Please enter a numeric value";
                this.state.numItemsErrorStyle = this.styles.errorStyle;
            }
        }

        this.setState(this.state);
    }

    private handleBtnClose(event:any): void{
        this.props.cbCloseDialog(undefined);
    }
    
    private handleBtnOk(event:any): void{
        let now = moment(new Date());
        let futur = moment(this.state.deliveryDate);

        let data = new SimulationConfig(
            Utilities.generateHistoricalThroughput(
                this.state.minValue as number, 
                this.state.maxValue as number, 
                10),
            this.state.throughputFrequency,
            new Date(),
            futur.diff(now, 'days'),
            this.state.numberOfItems as number,
            1000);
        
        this.props.cbCloseDialog(data);
    }

    private convertThroughput(): String{
        if (this.state.throughputFrequency == 0)
            return "hour"
        else if (this.state.throughputFrequency == 1)
            return "day"
        else
            return "week"
    }

    private tomorrow(): Date{        
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    private setInitialState():void {
        this.state = {
            shown: this.props.open, 
            minValue:undefined, 
            maxValue:undefined, 
            throughputFrequency: this.props.throughputFrequency,            
            minValueErrorText:"",
            minValueErrorStyle:this.styles.validStyle,
            maxValueErrorText:"",             
            maxValueErrorStyle:this.styles.validStyle,
            deliveryDate:new Date(),
            numberOfDays:30,
            numberOfItems:100,
            numItemsErrorText:this.DEFAULT_NUM_ITEMS_TEXTFIELD,
            numItemsErrorStyle:this.styles.validStyle};
    
        this.state.maxValueErrorText = this.DEFAULT_MAX_VALUE_TEXTFIELD + this.convertThroughput();
        this.state.minValueErrorText =this.DEFAULT_MIN_VALUE_TEXTFIELD + this.convertThroughput();
    }

    readonly styles = {
        validStyle: {
            color: cyan500
        },
        errorStyle: {
            color: red500
        }
    }

    readonly DEFAULT_MIN_VALUE_TEXTFIELD = "The minimal features produced per ";
    readonly DEFAULT_MAX_VALUE_TEXTFIELD = "The maximum features produced per ";
    readonly DEFAULT_NUM_ITEMS_TEXTFIELD = "How many features do you have to deliver?";
}
