/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/globals/react-easy-chart/index.d.ts" />

import * as React from "react";

import { CycleTime } from "../model/cycleTime";

import { ScatterplotChart, ScatterplotData } from "react-easy-chart";

export interface CycleTimeChartProps {
    cycleTimes: Array<CycleTime>
}

export class CycleTimeChart extends React.Component<CycleTimeChartProps, undefined> {
    render(): JSX.Element {

        if (this.props.cycleTimes.length == 0)
            return <div></div>

        const info = this.convertCycleTimes();

        let js = JSON.stringify(info.data);

        return <ScatterplotChart 
            data={info.data}
            width={640} height={480}
            margin={{top: 10, right: 10, bottom: 25, left: 60}} 
            axes={true}
            axisLabels={{ x: "Completion Date", y: "Cycle Time" }}
            xType="text"
            yType="linear"
            xDomainRange={[info.minDate, info.maxDate]}            
            yDomainRange={[0, info.maxCycleTime]}
        />
    }

    private convertCycleTimes(): { data: Array<any>, maxCycleTime:number, minDate: string, maxDate: string } {

        let maxCycleTime = 0;
        let min = new Date(8640000000000000);
        let max = new Date(-8640000000000000);

        let data = new Array(0);
        for (let cycleTime of this.props.cycleTimes) {
            data.push({
                type: 'CycleTime',
                x: this.convertDateToString(cycleTime.EndDate),
                y: cycleTime.Value
            });

            if (cycleTime.Value > maxCycleTime)
                maxCycleTime = cycleTime.Value;

            if (cycleTime.EndDate > max)
                max = cycleTime.EndDate

            if (cycleTime.EndDate < min)
                min = cycleTime.EndDate
        }

        return { 
            data, 
            maxCycleTime, 
            minDate:this.convertDateToString(min),
            maxDate:this.convertDateToString(max)};
    }

     monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
    
    private convertDateToString(date:Date):string{

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear() - 2000;

        return day + '-' + this.monthNames[monthIndex] + '-' + year;        
    }
}