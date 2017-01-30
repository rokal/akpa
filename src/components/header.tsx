/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {ThroughputFrequency} from "../throughputFrequencyEnum";
import {SimulationConfig} from "./simulationConfig";
import {NewProjectDialog} from "./newProjectDialog";

import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

export interface HeaderProps {
    cbLaunchSimulation:(data:SimulationConfig | undefined) => void    
}
export interface HeaderState {
    open:boolean;
    dialogOpen:boolean;
}
export class Header extends React.Component<HeaderProps, HeaderState>{

    constructor(props: HeaderProps) {
        super(props);
        this.state = {open: false, dialogOpen: false};
    }

    render(): JSX.Element {
    
        return <div> 
              <AppBar
                title="Determining potential delivery dates"                
                onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)} />               
              <Drawer 
                open={this.state.open} 
                docked={false}
                onRequestChange={(open, dialogOpen) => this.setState({
                    open:false, 
                    dialogOpen:false} )}>
                                
                <MenuItem onTouchTap={this.handleNewProject.bind(this)}>New project</MenuItem>
                <MenuItem onTouchTap={this.handleExistingProject.bind(this)}>Existing project</MenuItem>
              
              </Drawer>
              <NewProjectDialog ref="newdialog"
                open={this.state.dialogOpen} 
                throughputFrequency={ThroughputFrequency.Week}
                cbCloseDialog={this.handleCloseNewProjectDialog.bind(this)}
                />
            </div>;
    }

    handleNewProject(): void { 
        this.setState({open: false, dialogOpen: true});
    }

    handleExistingProject(): void{        
        this.setState({open: false, dialogOpen: false});
}

    handleCloseNewProjectDialog(data:SimulationConfig): void{
        this.setState({open: false, dialogOpen: false});
        
        if (data)
            this.props.cbLaunchSimulation(data);
    }

    handleDrawerToggle(): void{
        this.setState({open: !this.state.open, dialogOpen:false});
    };    
}
