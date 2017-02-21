/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/react-easy-chart/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom"; 

import {Forecast} from "../model/forecast";
import {SimulationResult} from "../model/simulationResult";

import {ScatterplotChart, ScatterplotData} from "react-easy-chart"; 

export interface ScatterPlotProps {  }

export class SimulationChart extends React.Component<ScatterPlotProps, undefined> {
    render(): JSX.Element {

        return <div></div>

    // let data = new Array<BarData>();
    //     for (let r of this.props.SimulationResults) {
    //         let bd: BarData = {x:r.NumberOfItemsCompleted, y:r.Occurences};
    //         data.push(bd);
    //     }

    // return <BarChart data={data} />;
    }
}