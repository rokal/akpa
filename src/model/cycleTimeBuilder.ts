import { CycleTime } from "./cycleTime";
import { DateRange } from "./dateRange";
import * as moment from "moment";


export class CycleTimeBuilder {

    //private static elements: Map;

    private constructor() {        
    }

    static build(dates:Array<DateRange>): Array<CycleTime>{
        let cycleTimes = new Array<CycleTime>(0);
        let startMoment = moment();
        let endMoment = moment();

        for (let date of dates){
            startMoment = moment(date.StartDate);
            endMoment = moment(date.EndDate);

             // If the end date is greater than the start date (up to the second)
            // skip this date range value as it is incorrect.
            if (endMoment.isBefore(startMoment, "second"))
                continue;

            let diff = endMoment.diff(startMoment, 'days') + 1;    
            cycleTimes.push(new CycleTime(diff, endMoment.toDate()));
        }

        return cycleTimes;
    }
}