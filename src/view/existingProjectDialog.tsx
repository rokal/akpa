/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimulationResult } from "../model/simulationResult";
import {ResultsDisplay} from "./resultsDisplay";

import {Tabs, Tab} from "material-ui/Tabs";
import FlatButton  from "material-ui/FlatButton";
import {Stepper, Step, StepButton, StepLabel, StepContent} from "material-ui/Stepper";
import RaisedButton  from "material-ui/RaisedButton";

export interface ExistingProjectDialogProps {
    open: boolean;
    cbCloseDialog: (originalData: Array<SimulationResult>) => void
}
export interface ExistingProjectDialogState {
    stepIndex: number
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
                        <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                            Load data from external tool
                        </StepButton>
                        <StepContent>

                        {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                            Load previous forecasts (optional)
                        </StepButton>
                        <StepContent>
                        {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
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
                    forecasts={undefined}/>
            </Tab>
        </Tabs>;
    }


    private handleBtnBack(event: any): void {
        let stepIndex = this.state.stepIndex;
        if (stepIndex > 0)
            this.setState({stepIndex: stepIndex -1 });
    }

    private handleBtnNext(event: any): void {
        let stepIndex = this.state.stepIndex;
        if (stepIndex < 2)
            this.setState({stepIndex: stepIndex + 1});
    }

    private renderStepActions(step:number): JSX.Element {
        const stepIndex = this.state.stepIndex

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                label={stepIndex == 2 ? "Finish" : "Next"}
                disableTouchRipple={true}
                disableFocusRipple={true}
                primary={true}
                onTouchTap={this.handleBtnNext.bind(this)}
                style={{marginRight: 12}}
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
            stepIndex: 0
        };
    }
}