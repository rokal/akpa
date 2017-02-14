import { Percentile } from "./percentile";
import { Forecast } from "./forecast";

export class ForecastDate extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString(): string {
        return `${this.NumberOfItemsCompleted} items completed with
                ${this.Percentile} confidence in 
                ${this.NumberOfDays} days.`;
    }
}