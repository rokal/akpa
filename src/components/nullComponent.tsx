import * as React from "react";
import * as ReactDOM from "react-dom";

export interface NullProps {}

export class NullComponent extends React.Component<NullProps, undefined>{

    render(){
        return <h1>AYOYE</h1>;
    }
}
