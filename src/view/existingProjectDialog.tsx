/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimulationResult } from "../model/simulationResult";
import { ResultsDisplay } from "./resultsDisplay";

import { Tabs, Tab } from "material-ui/Tabs";
import FlatButton from "material-ui/FlatButton";
import { Stepper, Step, StepButton, StepLabel, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { cyan500, red500 } from 'material-ui/styles/colors';

export interface ExistingProjectDialogProps {
    open: boolean;
    cbCloseDialog: (originalData: Array<SimulationResult>) => void
}
export interface ExistingProjectDialogState {
    stepIndex: number,
    filename: string
}

export class ExistingProjectDialog extends React.Component<ExistingProjectDialogProps, ExistingProjectDialogState>{

    constructor(props: ExistingProjectDialogProps) {
        super(props);
        this.setInitialState();
    }

    render(): JSX.Element {

        const stepIndex = this.state.stepIndex;

        return <Tabs>
            <Tab label="Input">
                <Stepper
                    linear={false}
                    orientation="vertical"
                    activeStep={this.state.stepIndex}>
                    <Step>
                        <StepButton onTouchTap={() => this.handleBtnStep(0)}>
                            Load data from external tool
                        </StepButton>
                        <StepContent>
                            <TextField
                                id="fileUploadTextField"
                                value={this.state.filename}
                                floatingLabelFocusStyle={this.styles.validStyle}
                                floatingLabelText="Select the file to upload"
                                hintText="Choose the file"
                                underlineFocusStyle={this.styles.validStyle}
                            />
                            <RaisedButton
                                label="Pick a file"
                                style={this.styles.button}
                                containerElement="label"
                            >
                                <input
                                    type="file"
                                    onChange={this.handleFileChange.bind(this)}
                                    style={this.styles.exampleImageInput}
                                />
                            </RaisedButton>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.handleBtnStep(1)}>
                            Load previous forecasts (optional)
                        </StepButton>
                        <StepContent>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.handleBtnStep(2)}>
                            Confirm forecasts generation
                        </StepButton>
                        <StepContent>

                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </Tab>
            <Tab label="Forecasts">
                <ResultsDisplay
                    simulationConfig={undefined}
                    numberOfSimulations={1000}
                    forecasts={undefined} />
            </Tab>
        </Tabs>;
    }

    private handleBtnStep(index: number): void {
        this.state.stepIndex = index;
        this.setState(this.state);
    }

    private handleFileChange(e: any): void {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e: any) {
            var data = e.target.result;

            var workbook;
            // if(rABS) {
            //     /* if binary string, read with type 'binary' */
            //     workbook = XLSX.read(data, {type: 'binary'});
            // } else {
            //     /* if array buffer, convert to base64 */
            //     var arr = fixdata(data);
            //     workbook = XLSX.read(btoa(arr), {type: 'base64'});
            // }

            /* DO SOMETHING WITH workbook HERE */
        };
        fileReader.onloadend = function (e: any) {
            console.log("File load " + e);
        }
        fileReader.readAsBinaryString(file);

        this.state.filename = file.name;
        this.setState(this.state);
    }

    private onFileLoad(event: any): void {

    }

    private handleBtnBack(event: any): void {
        let stepIndex = this.state.stepIndex;
        if (stepIndex > 0)
            this.state.stepIndex = -1;

        this.setState(this.state);
    }

    private handleBtnNext(event: any): void {
        let stepIndex = this.state.stepIndex;
        if (stepIndex < 2)
            this.state.stepIndex = stepIndex + 1;

        this.setState(this.state);
    }

    private renderStepActions(step: number): JSX.Element {
        const stepIndex = this.state.stepIndex

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex == 2 ? "Finish" : "Next"}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleBtnNext.bind(this)}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handleBtnBack.bind(this)}
                    />
                )}
            </div>
        );
    }

    private setInitialState(): void {
        this.state = {
            stepIndex: 0,
            filename: ""
        };
    }

    readonly styles = {
        validStyle: {
            color: cyan500
        },
        errorStyle: {
            color: red500
        },
        button: {
            margin: 12,
        },
        exampleImageInput: {
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