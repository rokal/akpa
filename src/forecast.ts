import {Percentile} from "./percentile";

export abstract class Forecast {
    public Percentile: Percentile;

    public NumberOfItemsCompleted: Number;

    public NumberOfDays: Number;

    constructor(percentile: Percentile, numberOfItemsCompleted: Number, numberOfDays: Number) {
        this.Percentile = percentile;
        this.NumberOfItemsCompleted = numberOfItemsCompleted;
        this.NumberOfDays = numberOfDays;
    }

    abstract toString(): String;
}