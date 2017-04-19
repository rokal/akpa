import {Simulation} from "./simulation";
import {SimulationConfig} from "./simulationConfig";
import {ThroughputFrequency} from "./throughputFrequencyEnum";
import {Utilities} from "../../utilities";

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
            throughputResults = this.generateThroughputs();

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            super.addSimulationResult(simulatedNumberOfItemsCompleted, 
                                      this.NumberOfDays,
                                      (result) => {return result.NumberOfItemsCompleted == simulatedNumberOfItemsCompleted});
        }
    }

    private generateThroughputs(): Array<number>{

        let throughputResults: number[];
        let randomIndex: number;

        let counter = this.NumberOfDays;
        if (this.ThroughputFrequency == ThroughputFrequency.Week) {
            counter = Math.floor(this.NumberOfDays / 7);
        }

        throughputResults = new Array(counter);
        for (let j = 0; j < counter; j++) {

            randomIndex = this.RandomIndexGenerator;
            throughputResults[j] = this.HistoricalThroughput[randomIndex];
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