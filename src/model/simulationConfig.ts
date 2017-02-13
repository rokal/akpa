import { ThroughputFrequency } from "./throughputFrequencyEnum";
import * as moment from "moment";

export class SimulationConfig {

    public get DeliveryDate(): Date {
        return this.deliveryDate;
    }
    private deliveryDate: Date;

    constructor(
        public readonly HistoricalThroughput: Array<number>,
        public readonly ThroughputFrequency: ThroughputFrequency,
        public readonly StartDate: Date,
        public readonly NumberOfDays: number,
        public readonly NumberOfItems: number,
        public readonly NumberOfSimulations: number) {

        let now = moment(this.StartDate);
        this.deliveryDate = now.add(this.NumberOfDays, "days").toDate();
    }
}