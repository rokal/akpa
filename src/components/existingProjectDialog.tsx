/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {SimulationResult} from "../simulationResult";

import {Dialog} from "material-ui/Dialog";
import {FlatButton} from "material-ui/FlatButton";
import {Stepper, Step, StepButton} from "material-ui/Stepper";
import {RaisedButton} from "material-ui/RaisedButton";

interface ExistingProjectDialogProps{
    open:boolean;
    cbCloseDialog:(originalData:Array<SimulationResult>) => void    
}
interface ExistingProjectDialogState{
    stepIndex:number
}

export class ExistingProjectDialog extends React.Component<ExistingProjectDialogProps, ExistingProjectDialogState>{

    constructor(props: ExistingProjectDialogProps){
        super(props); 
        this.setInitialState();       
    }

    render(): JSX.Element{

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

        // This variable is used to simplify reading the code below.
        const stepIndex = this.state.stepIndex; 

        return <div>
                
                    <Dialog
                        open={false}>
                        <Stepper linear={false} activeStep={this.state.stepIndex}>
                        </Stepper> 
                    </Dialog>
                    <div>
                        <p>{this.getStepContent(stepIndex)}</p>
                        <div style={{marginTop: 12}}>
                            <FlatButton
                                label="Back"
                                disabled={this.state.stepIndex === 0}
                                onTouchTap={this.handleBtnBack}
                                style={{marginRight: 12}}
                            />
                            <RaisedButton
                                label="Next"
                                disabled={stepIndex === 2}
                                primary={true}
                                onTouchTap={this.handleBtnNext}
                            />
                        </div>
                    </div>      
                </div>         
    }

    private handleBtnBack(event:any): void{
        
    }

    private handleBtnNext(event:any): void{

    }

    private getStepContent(stepIndex: number): string {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    private handleBtnClose(event:any): void{
        this.props.cbCloseDialog(new Array<SimulationResult>(0));
    }
    
    private handleBtnOk(event:any): void{
        this.props.cbCloseDialog(new Array<SimulationResult>(0));
    }

    private setInitialState(): void{
        this.state = {
            stepIndex: 0
        };
    }   
}