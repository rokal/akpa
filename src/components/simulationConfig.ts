import {ThroughputFrequency} from "../throughputFrequencyEnum";

export class SimulationConfig{
    constructor(
        public readonly HistoricalThroughput: Array<number>,
        public readonly ThroughputFrequency: ThroughputFrequency,
        public readonly StartDate: Date,
        public readonly NumberOfDays: number,
        public readonly DeliveryDate: Date,
        public readonly NumberOfItems: number){
        }
}