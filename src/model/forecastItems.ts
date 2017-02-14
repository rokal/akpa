import { Percentile } from "./percentile";
import { Forecast } from "./forecast";

export class ForecastItems extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString(): string {
        return `In ${this.NumberOfDays} days, 
                ${this.Percentile} confidence of completing 
                ${this.NumberOfItemsCompleted} items`;
    }
}