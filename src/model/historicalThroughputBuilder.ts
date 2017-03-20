import { DateRange } from "./dateRange";
import { HistoricalThroughputs} from "./historicalThroughputs";
import * as moment from "moment";

export class HistoricalThroughputBuilder {

    private constructor() {        
    }

    static build(dates: Array<DateRange>): HistoricalThroughputs {

        let history = new HistoricalThroughputs();
        let startMoment = moment();
        let endMoment = moment();

        for (let range of dates) {
            startMoment = moment(range.StartDate);
            endMoment = moment(range.EndDate);

            // If the end date is greater than the start date (up to the second)
            // skip this date range value as it is incorrect.
            if (endMoment.isBefore(startMoment, "second"))
                continue;

            history.add(endMoment); 
        }

        return history;
    }
}

