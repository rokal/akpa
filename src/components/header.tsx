import * as React from "react";
import * as ReactDOM from "react-dom";

import {ThroughputFrequency} from "../throughputFrequencyEnum";
import {SimulationConfig} from "./simulationConfig";
import {NewProjectDialog} from "./newProjectDialog";

import RaisedButton from 'material-ui/RaisedButton';
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

export interface HeaderProps {
    cbLaunchSimulation:(data:SimulationConfig) => void    
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

    render() {
    
        return <div> 
              <AppBar
                title="Determining potential delivery dates"
                onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)} />               
              <Drawer 
                open={this.state.open} 
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

                // <ul>
                //   <li>To deliver for {<DatePicker hintText="delivery date" />}</li>
                // </ul>Open a Date Picker dialog from within a dialog.

    handleNewProject(): void { 
        //this.refs["newdialog"].state;
        this.setState({
            open: false, 
            dialogOpen: true}); 
    }

    handleCloseNewProjectDialog(shown:boolean, data:SimulationConfig): void{
        this.setState({
            open:false,
            dialogOpen: shown
        });

        this.props.cbLaunchSimulation(data);
    }

    handleExistingProject(): void{        
    }

    handleDrawerToggle(): void{
        this.setState({
            open: !this.state.open,
            dialogOpen:false});
    };    
}
