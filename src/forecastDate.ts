import {Forecast} from "forecast";
import {Percentile} from "Percentile";

export class ForecastDate extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString(): String {
        return "In " + this.NumberOfDays +
               " days, " + this.Percentile +
               "% confidence of completing " + this.NumberOfItemsCompleted +
               " items";
    }
}