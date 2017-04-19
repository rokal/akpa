import { Percentile } from "./percentile";
import { Forecast } from "./forecast";

export class ForecastItems extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: number, numberOfDays: number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString(): string {
        return `In ${this.NumberOfDays} days, 
                ${this.Percentile} confidence of completing at least 
                ${this.NumberOfItemsCompleted} items`;
    }
}