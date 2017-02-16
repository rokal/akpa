import {Simulation} from "./simulation";
import {SimulationConfig} from "./simulationConfig";
import {ThroughputFrequency} from "./throughputFrequencyEnum";

export class SimulationDate extends Simulation{

    constructor(config:SimulationConfig) {  
        super(config)
    }

    execute(): void{

        // Variables used in function
        let throughputResults: number[] = new Array(this.NumberOfDays);
        let simulatedNumberOfItemsCompleted: number;

        // Produce X simulations
        for (let i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate random throughputs based on the historical values
            throughputResults = this.generateRandomThroughputs();

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            super.addSimulationResult(simulatedNumberOfItemsCompleted, 
                                      this.NumberOfDays,
                                      (result) => {return result.NumberOfItemsCompleted == simulatedNumberOfItemsCompleted});
        }
    }

    private generateRandomThroughputs(): Array<number>{

        let throughputResults: number[];
        let randomIndex: number;

        throughputResults = new Array(this.NumberOfDays);
        for (let j = 0; j < this.NumberOfDays; j++) {

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
        let total = 0;
        for (let value of throughputResults)
            total += value;
        return Math.round(total);
    }
}