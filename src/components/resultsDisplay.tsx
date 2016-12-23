import * as React from "react";
import * as ReactDOM from "react-dom";
import {Forecast} from "forecast";

export interface ResultsProps { forecasts: Forecast[]; }

// 'ResultsProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class ResultsDisplay extends React.Component<ResultsProps, undefined> {
    render() {

    var message = "<ul>";
    for (let f of this.props.forecasts)
        message += "<li>" + f.toString() + "</li>";

    const fc = this.props.forecasts;
    const listItems = fc.map((currentForecast, index, arr) =>
        <li>{currentForecast.toString()}</li>
    );

    return <ul>{listItems}</ul>;
    }
}