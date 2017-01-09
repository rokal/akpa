import {Percentile} from "Percentile";

// The './' in the following line is extremely important.
// While it doesn't affect our production code or help the
// Typescript compiler, it is necessary when we run our tests.
// The jest test framework somehow has a problem with resolving
// the base class 'Forecast'. It doesn't do this for 'Percentile'
// in the above statement but when it comes to base class, we
// have to put the './' in front.
import {Forecast} from "./forecast";

export class ForecastDate extends Forecast {
    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        super(percentile, numberOfItemsCompleted, numberOfDays);
    }

    toString(): String {
         return `${this.NumberOfItemsCompleted} items completed with ` +
               `${this.Percentile} confidence of completing in ${this.NumberOfDays} days.`; 
    }
}