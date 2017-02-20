/*/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Forecast} from "../model/forecast";
import { ThroughputFrequency } from "../model/throughputFrequencyEnum";
import { SimulationConfig } from "../model/simulationConfig";
import { SimulationResult} from "../model/simulationResult";
import { NewProjectDialog } from "./newProjectDialog";
import { ExistingProjectDialog } from "./existingProjectDialog";

import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

export interface HeaderProps {
    cbLaunchSimulation: (data: SimulationConfig | undefined) => void
}
export interface HeaderState {
    drawerOpen: boolean;
    newDialogOpen: boolean;
    existingDialogOpen: boolean;
}
export class Header extends React.Component<HeaderProps, HeaderState>{

    constructor(props: HeaderProps) {
        super(props);
        this.setInitialState();
    }

    render(): JSX.Element {

        return <div>
            <NewProjectDialog
                visible={this.state.newDialogOpen}
                throughputFrequency={ThroughputFrequency.Week}
            />
            <ExistingProjectDialog
                visible={this.state.existingDialogOpen}
            />
        </div>;
    }

    private handleMnItemNewProject(): void {
        this.state.drawerOpen = false;
        this.state.newDialogOpen = true;
        this.state.existingDialogOpen = false;
        this.setState(this.state);
    }

    private handleMnItemExistingProject(): void {
        this.state.drawerOpen = false;
        this.state.newDialogOpen = false;
        this.state.existingDialogOpen = true;
        this.setState(this.state);
    }

    private cbCloseNewProjectDialog(data: SimulationConfig): void {
        this.state.newDialogOpen = false;
        this.setState(this.state);

        if (data)
            this.props.cbLaunchSimulation(data);
    }

    private cbCloseExistingProjectDialog(originalData: Array<SimulationResult>): void{
        this.state.existingDialogOpen = false;
        this.setState(this.state);

        // Do some operations to show initial and new forecast with
        // list of tasks to help user pick the right decision
    }

    private handleDrawerToggle(): void {
        this.state.drawerOpen = !this.state.drawerOpen;
        this.setState(this.state);
    };

    private setInitialState(): void {
        this.state = {
            drawerOpen: false,
            newDialogOpen:false,
            existingDialogOpen:false            
        }
    }
}
*/
