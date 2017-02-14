import {Simulation} from "./simulation";
import {SimulationConfig} from "./simulationConfig";
import {ThroughputFrequency} from "./throughputFrequencyEnum";

export class SimulationDate extends Simulation{

    constructor(config:SimulationConfig) {  
        super(config)
    }

    execute(): void{

        // Variables used in function
        var throughputResults: number[] = new Array(this.NumberOfDays);
        var simulatedNumberOfItemsCompleted: number;

        // Produce X simulations
        for (var i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate random throughputs based on the historical values
            throughputResults = this.generateRandomThroughputs();

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            super.addSimulationResult(simulatedNumberOfItemsCompleted, this.NumberOfDays);
        }
    }

    private generateRandomThroughputs(): Array<number>{

        var throughputResults: number[];
        var randomIndex: number;

        throughputResults = new Array(this.NumberOfDays);
        for (var j = 0; j < this.NumberOfDays; j++) {

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