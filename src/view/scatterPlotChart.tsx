/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../../typings/globals/react-easy-chart/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { CycleTime } from "../model/cycleTime";
import { Forecast } from "../model/forecast";
import { SimulationResult } from "../model/simulationResult";

import { ScatterplotChart, ScatterplotData } from "react-easy-chart";

export interface ScatterPlotProps {
    cycleTimes: Array<CycleTime>
}

export class SimulationChart extends React.Component<ScatterPlotProps, undefined> {
    render(): JSX.Element {

        const info = this.convertCycleTimes();

        return <ScatterplotChart
            data={info.data}
            width={160} height={90}
            axes={true}
            axisLabels={{ x: "Completion Date", y: "Cycle Time" }}
            yType="linear"
            xType="time"
        />
    }

    private convertCycleTimes(): { data: Array<any>, minDate: Date, maxDate: Date } {

        let maxCycleTime = 0;
        let minDate = new Date(8640000000000000);
        let maxDate = new Date(-8640000000000000);

        let data = new Array(0);
        for (let cycleTime of this.props.cycleTimes) {
            data.push({
                type: 'CycleTime',
                x: cycleTime.EndDate,
                y: cycleTime.Value
            });

            if (cycleTime.Value > maxCycleTime)
                maxCycleTime = cycleTime.Value;

            if (cycleTime.EndDate > maxDate)
                maxDate = cycleTime.EndDate

            if (cycleTime.EndDate < minDate)
                minDate = cycleTime.EndDate
        }

        return { data, minDate, maxDate };
    }
}