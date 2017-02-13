import {DateRange} from "./dateRange";
import * as moment from "moment"; 

export class ThroughputBuilder{
    
    private constructor(){
    }

    static build(dates:Array<DateRange>): Array<number>{

        let throughputs = new Array<number>(0);
        let startMoment = moment();
        let endMoment = moment();
        let throughput: number;

        for (let range of dates){
            startMoment = moment(range.StartDate);
            endMoment = moment(range.EndDate);

            // If the end date is greater than the start date (up to the second)
            // skip this date range value as it is incorrect.
            if (endMoment.isBefore(startMoment, "second"))
                continue;

            // Note on the + 1 at the end of the line of code:
            // If the start and end date is on the same day, we add a day to the
            // throughput. We assume that some work was held on that day so the
            // time required to work on this element was at least one day.
            // This is based on Daniel Vacanti book Actionable Agile, p.89
            throughput = endMoment.diff(startMoment, "days", false) + 1;
            
            throughputs.push(throughput);
        }        

        return throughputs;
    }
}