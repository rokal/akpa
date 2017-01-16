import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export interface SimButtonProps {}

export class SimulationButton extends React.Component<SimButtonProps, undefined>{
    render () {
        return <MuiThemeProvider>
                <RaisedButton label="Default" />
                </MuiThemeProvider>;
    }
}
