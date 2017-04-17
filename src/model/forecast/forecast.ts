import { Percentile } from "./percentile";

export abstract class Forecast {

    constructor(public readonly Percentile: Percentile,
                public readonly NumberOfItemsCompleted: number,
                public readonly NumberOfDays: number) {
    }

    abstract toString(): string;
}