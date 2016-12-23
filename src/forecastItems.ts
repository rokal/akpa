import {Forecast} from "forecast";
import {Percentile} from "Percentile";

export class ForecastItems extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString() : String {
        return this.NumberOfItemsCompleted + " items completed with " + 
        this.Percentile + "% confidence of completing in " + this.NumberOfDays + " days";
    }
}