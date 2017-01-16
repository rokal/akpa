/// <reference path="../../typings/globals/react-easy-chart/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom"; 
import {BarChart} from "react-easy-chart"; 
import {BarData} from "react-easy-chart";

import {Forecast} from "../forecast";
import {SimulationResult} from "../simulationResult";

export interface SimulationChartProps { SimulationResults: SimulationResult[]; }

export class SimulationChart extends React.Component<SimulationChartProps, undefined> {
    render() {

    let data = new Array<BarData>();
        for (let r of this.props.SimulationResults) {
            let bd: BarData = {x:r.NumberOfItemsCompleted, y:r.Occurences};
            data.push(bd);
        }

    return <BarChart data={data} />;
    }
}