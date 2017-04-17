import { ThroughputFrequency } from "./throughputFrequencyEnum";
import * as moment from "moment";

export class SimulationConfig {

    public set NumberOfDays(value:number){
        this.numberOfDays = value;
        this.calculateDeliveryDate();
    }
    public get NumberOfDays():number{
        return this.numberOfDays;
    }
    private numberOfDays:number;

    public set StartDate(value:Date){
        this.startDate = value;
        this.calculateDeliveryDate();
    }
    public get StartDate():Date{
        return this.startDate;
    }
    private startDate:Date;

    public get DeliveryDate(): Date {
        return this.deliveryDate;
    }
    private deliveryDate: Date;

    constructor(
        public HistoricalThroughput: Array<number>,
        public ThroughputFrequency: ThroughputFrequency,
               startDate: Date,
               numberOfDays: number,
        public NumberOfItems: number,
        public NumberOfSimulations: number) {
        this.startDate = startDate;
        this.numberOfDays = numberOfDays;

        this.calculateDeliveryDate();
    }

    private calculateDeliveryDate():void{
        let now = moment(this.startDate);
        this.deliveryDate = now.add(this.numberOfDays, "days").toDate();
    }

    public static Empty = new SimulationConfig(
        new Array<number>(0),
        ThroughputFrequency.Day,
        new Date(1900, 0, 1),
        25,
        100,
        1000);
}