/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";

import { ExcelImporter } from "../model/io/excelImporter";
import { ExcelImportResult } from "../model/io/excelImportResult";
import { ProjectEvent, ExistingProjectEvent } from "./projectEvents";

import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import { grey900 } from 'material-ui/styles/colors';

export interface ExistingProjectDialogProps {
    visible: boolean;
    cbHandleConfiguration: (event: ProjectEvent) => void;
}
export interface ExistingProjectDialogState {
    stepIndex: number,
    excelFilename: string,
    columns: Array<string>,
    startColumn: string,
    endColumn: string,
    jsonFilename: string,
    importErrors: Array<ExcelImportResult>,
}

export class ExistingProjectDialog extends React.Component<ExistingProjectDialogProps, ExistingProjectDialogState>{

    private excelBlob: File;
    private excelHtmlInput: any;
    private static excelFilename: string;
    private excelImporter: ExcelImporter;

    private jsonBlob: File;
    private jsonHtmlInput: any
    private static jsonFilename: string

    constructor(props: ExistingProjectDialogProps) {
        super(props);
        this.setInitialState();
    }

    render(): JSX.Element {

        if (!this.props.visible)
            return <div></div>

        // This block of code builds the 2 selectors that will show up under
        // the Excel file upload. It will contain the columns of the spreadsheet
        const startSelector = this.buildSelector("Start", (value: string) => { this.state.startColumn = value; }, () => { return this.state.startColumn }, this.handleChangeStartColumn);
        const endSelector = this.buildSelector("End", (value: string) => { this.state.endColumn = value; }, () => { return this.state.endColumn }, this.handleChangeEndColumn);

        return <div>
            <p>Load data from your external tool</p>
            <div>
                <RaisedButton
                    className="forecastsButton"
                    label="Select an Excel file"
                    containerElement="label"
                >
                    <input
                        type="file"
                        onChange={this.handleExcelFileChange.bind(this)}
                        style={this.styles.input}
                    />
                </RaisedButton>
                <TextField
                    id="fileDataUploadTextField"
                    value={this.state.excelFilename}
                    floatingLabelText="Excel file uploaded"
                    disabled={true}
                    floatingLabelStyle={this.styles.textField}
                    inputStyle={this.styles.textField}
                    underlineStyle={this.styles.textField}
                />
                <div>
                    <p>Select the columns from which we read the dates:</p> 
                    {startSelector}
                    {endSelector}
                </div>
            </div>
            <div>
                <p>Load previous forecasts (optional)</p>
                <RaisedButton
                    className="forecastsButton"
                    label="Select a .json file"
                    containerElement="label"
                >
                    <input
                        type="file"
                        onChange={this.handleJsonFileChange.bind(this)}
                        style={this.styles.input}
                    />
                </RaisedButton>
                <TextField
                    id="fileForecastsTextField"
                    value={this.state.jsonFilename}
                    floatingLabelText="Previous forecasts to upload"
                    disabled={true}
                    floatingLabelStyle={this.styles.textField}
                    inputStyle={this.styles.textField}
                    underlineStyle={this.styles.textField}
                />
            </div>
            <div className="buttons">
                <RaisedButton
                    className="forecastsButton"
                    label="Create forecasts"
                    onTouchTap={this.handleBtnCreateForecast.bind(this)}
                    containerElement="label" />
            </div>
        </div>;
    }

    private handleExcelFileChange(eventInput: any): void {
        this.excelBlob = eventInput.target.files[0];
        this.excelHtmlInput = eventInput.target;

        this.state.startColumn = this.state.endColumn = "";
        this.state.excelFilename = this.excelBlob.name;
        ExistingProjectDialog.excelFilename = this.excelBlob.name;

        // Instanciate and configure the FileReader object
        let fileReader = new FileReader();
        fileReader.onload = (e: any) => {
            this.excelImporter = new ExcelImporter(ExistingProjectDialog.excelFilename);
            e.target.columns = this.excelImporter.readHeaders(e.target.result);
        }
        fileReader.onloadend = (eventFileReader: any) => {
            console.log(`File ${ExistingProjectDialog.excelFilename} loaded successfully with ${eventFileReader.loaded} bytes`);
            this.callbackExcelFileChange(eventInput, eventFileReader.target.columns);
        }
        fileReader.onloadstart = (e: any) => { console.log(`File ${ExistingProjectDialog.excelFilename} being loaded`); }
        fileReader.onerror = (e: any) => { console.log(`File ${ExistingProjectDialog.excelFilename} failed: Error ${e}`); };

        fileReader.readAsBinaryString(this.excelBlob);

        this.setState(this.state);
    }

    private callbackExcelFileChange(eventInput: any, columns: any) {
        this.excelHtmlInput.value = "";
        this.state.columns = (columns == undefined ? [] : columns);
        if (this.state.columns.length > 0) {
            this.state.startColumn = this.state.columns[0];
            this.state.endColumn = this.state.columns[this.state.columns.length - 1];
        }
        this.setState(this.state);
    }

    private handleJsonFileChange(eventInput: any): void {
        this.jsonBlob = eventInput.target.files[0];
        this.jsonHtmlInput = eventInput.target;

        this.state.startColumn = this.state.endColumn = "";
        this.state.jsonFilename = this.jsonBlob.name;
        ExistingProjectDialog.jsonFilename = this.jsonBlob.name;

        let fileReader = new FileReader();
        fileReader.onload = (e: any) => {

        }
        fileReader.onloadend = (eventFileReader: any) => {
            console.log(`File ${ExistingProjectDialog.jsonFilename} loaded successfully with ${eventFileReader.loaded} bytes`);
            this.callbackJsonFileChange(eventInput, eventFileReader.target.columns);
        }
        fileReader.onloadstart = (e: any) => { console.log(`File ${ExistingProjectDialog.jsonFilename} being loaded`); }
        fileReader.onerror = (e: any) => { console.log(`File ${ExistingProjectDialog.jsonFilename} failed: Error ${e}`); };

        fileReader.readAsBinaryString(this.excelBlob);

        this.setState(this.state);
    }

    private callbackJsonFileChange(eventInput: any, columns: any) {
        this.jsonHtmlInput.value = "";
    }

    private handleChangeStartColumn(event: any, index: number, value: any): void {
        this.state.startColumn = value;
        this.setState(this.state);
    }

    private handleChangeEndColumn(event: any, index: number, value: any): void {
        this.state.endColumn = value;
        this.setState(this.state);
    }

    private handleBtnCreateForecast(): void {
        let importResults = this.excelImporter.readCompleteFile(
            this.state.startColumn,
            this.state.endColumn);

        if (this.props.cbHandleConfiguration != undefined)
            this.props.cbHandleConfiguration(new ExistingProjectEvent(importResults));
    }

    private buildSelector(title: String,
        setStateVariable: (value: string) => void,
        getStateVariable: () => string,
        handler: (event: any, index: number, value: any) => void): JSX.Element {

        let value = this.state.columns[0];
        if (getStateVariable() == "")
            setStateVariable(value);
        else
            setStateVariable(getStateVariable());

        const menuItems = new Array<JSX.Element>(0);
        for (let column of this.state.columns)
            menuItems.push(
                <MenuItem
                    value={column}
                    key={title + "." + column}
                    primaryText={column} />
            );

        return <SelectField
            floatingLabelText={title}
            value={getStateVariable()}
            disabled={this.state.columns.length == 0}
            onChange={handler.bind(this)}>
            {menuItems}            
        </SelectField>;
    }

    private setInitialState(): void {
        this.state = {
            stepIndex: 0,
            excelFilename: "",
            columns: new Array<string>(0),
            startColumn: "",
            endColumn: "",
            jsonFilename: "",
            importErrors: Array<ExcelImportResult>(0)
        };
    }

    readonly styles = {
        textField: {
            color: grey900,
            cursor: 'cursor',
        },
        input: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        }
    }
}