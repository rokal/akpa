import { Percentile } from "./percentile";

export abstract class Forecast {

    constructor(public readonly Percentile: Percentile,
                public readonly NumberOfItemsCompleted: Number,
                public readonly NumberOfDays: Number) {
    }

    abstract toString(): string;
}