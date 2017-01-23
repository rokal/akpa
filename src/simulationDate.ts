import {ForecastItems} from "./forecastItems";
import {Percentile} from "./percentile";
import {Simulation} from "./simulation";
import {SimulationResult} from "./simulationResult";
import {ThroughputFrequency} from "./throughputFrequencyEnum";

import * as moment from "moment";

export class SimulationDate extends Simulation{

    public get StartDate(): Date{
        return this.startDate;
    }
    private startDate: Date;

    public get NumberOfDays() : number{
        return this.numberOfDays;
    }
    private numberOfDays: number;

    public get DeliveryDate() : Date{
        return this.deliveryDate;
    }
    private deliveryDate: Date;

    constructor(startDate: Date,
                numberOfDays: number, 
                numberOfSimulations: number, 
                throughputFrequency: ThroughputFrequency) {  
        super(numberOfSimulations, throughputFrequency)
        this.startDate = startDate;
        this.numberOfDays = numberOfDays;

        let start = moment(this.startDate);
        this.deliveryDate = start.add(this.numberOfDays, 'days').toDate();
    }

    execute(): void{

        // Variables used in function
        var throughputResults: number[] = new Array(this.numberOfDays);
        var simulatedNumberOfItemsCompleted: number;

        // Produce X simulations
        for (var i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate random throughputs based on the historical values
            throughputResults = this.generateRandomThroughputs();

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            super.addSimulationResult(simulatedNumberOfItemsCompleted, this.numberOfDays);
        }
    }

    private generateRandomThroughputs(): Array<number>{

        var throughputResults: number[];
        var randomIndex: number;

        throughputResults = new Array(this.numberOfDays);
        for (var j = 0; j < this.numberOfDays; j++) {

            randomIndex = this.RandomIndexGenerator;

            if (this.ThroughputFrequency == ThroughputFrequency.Day) {
                throughputResults[j] = this.HistoricalThroughput[randomIndex];
            }       
            else if (this.ThroughputFrequency == ThroughputFrequency.Week){
                throughputResults[j] = this.HistoricalThroughput[randomIndex] / 5;
            }
        }

        return throughputResults;
    }

    private addItems(throughputResults: number[]): number {
        var total = 0;
        for (var value of throughputResults)
            total += value;
        return Math.round(total);
    }
}