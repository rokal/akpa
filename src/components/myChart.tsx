/// <reference path="../../typings/globals/react-easy-chart/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom"; 
import {BarChart} from "react-easy-chart"; 
import {BarData} from "react-easy-chart";

import {Forecast} from "../forecast";
import {SimulationResult} from "../simulationResult";

export interface MyChartProps { SimulationResults: SimulationResult[]; }

export class MyChart extends React.Component<MyChartProps, undefined> {
    render() {

    let toto = new Array<BarData>();
        for (let r of this.props.SimulationResults) {
            let bd: BarData = {x:r.NumberOfItemsCompleted, y:r.Occurences};
            toto.push(bd);
        }

    return <BarChart
    data={toto}
  />;
  //   return <BarChart
  //   data={[
  //     {x: 'A', y: 20},
  //     {x: 'B', y: 30},
  //     {x: 'C', y: 40},
  //     {x: 'D', y: 20},
  //     {x: 'E', y: 40},
  //     {x: 'F', y: 25},
  //     {x: 'G', y: 5}
  //   ]}
  // />;
    }
}