/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {ThroughputFrequency} from "../throughputFrequencyEnum";
import {SimulationConfig} from "./simulationConfig";
import {Utilities} from "../utilities";

import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {List, ListItem} from 'material-ui/List';
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";

export interface NewProjectDialogProps {
    open:boolean;
    throughputFrequency:ThroughputFrequency;
    cbCloseDialog:(shown:boolean, data: SimulationConfig) => void
}

export interface NewProjectDialogState {
    shown:boolean;
    minValue?:number,
    maxValue?:number,
    throughputFrequency?:ThroughputFrequency;
    startDate?: Date,
    numberOfDays?: number;
    numberOfItems?: number,
    errorText?:String
}

export class NewProjectDialog extends React.Component<NewProjectDialogProps, NewProjectDialogState>{

    constructor(props: NewProjectDialogProps) {
        super(props);
        this.state = {
            shown: props.open, 
            minValue:0, 
            maxValue:10, 
            throughputFrequency: props.throughputFrequency,
            errorText:""};
    }

    render(): JSX.Element {
    
        const actions = [
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleDialogClose.bind(this)}
        />,
        ];

        return <Dialog
                title="Build simulations for a new Kanban project"
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.handleDialogClose}>

                Between 
                <TextField
                    id="minValueTextField"
                    hintText="minimum value"
                    onChange={this.handleMinValueChange.bind(this)}
                    errorText={this.state.errorText}
                /> and <TextField
                    id="maxValueTextField"
                    hintText="maximum value"
                /> items per <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.throughputFrequency}
                    onChange={this.handleChangeFrequency.bind(this)}
                >
                    <MenuItem value={ThroughputFrequency.Week} primaryText="week" />
                    <MenuItem value={ThroughputFrequency.Day} primaryText="day" />
                    <MenuItem value={ThroughputFrequency.Hour} primaryText="hour" />
                </SelectField>.
                <List>
                    <ListItem primaryText="To deliver for {<DatePicker/>}:"></ListItem><DatePicker/>
                    <ListItem primaryText="To deliver {<TextField/>}" />
                </List>
                
              </Dialog>              
    }

    handleMinValueChange(e:any){
        let value = e.target.value;
        let state: NewProjectDialogState = {
            shown:true, 
            minValue: e.target.value, 
            maxValue: this.state.maxValue, 
            throughputFrequency: this.state.throughputFrequency,
            errorText: ""};

        if (value == "")        
            state.errorText = "Woops";
        
        state.minValue = e.target.value;
        this.setState(state);
    }

    handleChangeFrequency(event: any,key: number, value:any): void{
        this.setState({
            shown: this.state.shown,
            throughputFrequency:value});
    }

    handleDialogClose(): void{
        // let data = new SimulationConfig(
        //     Utilities.generateHistoricalThroughput(this.state.minValue as number, this.state.maxValue as number, 10),
        //     this.state.throughputFrequency as ThroughputFrequency,
        //     this.state.startDate as Date,
        //     this.state.numberOfDays as number,
        //     this.state.numberOfItems as number
        // );
        let data = new SimulationConfig(
            Utilities.generateHistoricalThroughput(2, 10, 10),
            this.state.throughputFrequency as ThroughputFrequency,
            new Date(),
            30,
            100
        );
        
        this.props.cbCloseDialog(false, data);
    }
}
