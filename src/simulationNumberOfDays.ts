import {ForecastItems} from "ForecastItems";
import {Percentile} from "Percentile";
import {Simulation} from "Simulation";
import {SimulationResult} from "SimulationResult";

export class SimulationNumberOfDays extends Simulation{

    private numberOfDays: number;

    constructor(numberOfDays: number, numberOfSimulations: number) {  
        super(numberOfSimulations)
        this.numberOfDays = numberOfDays;
    }

    execute(): void{

        // Variables used in the inner for
        var throughputResults: number[] = new Array(this.numberOfDays);
        var randomIndex: number;
        var simulatedNumberOfItemsCompleted: number;

        // Produce X simulations
        for (var i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate random througputs based on the historical values
            for (var j = 0; j < this.numberOfDays; j++) {
                randomIndex = this.RandomIndexGenerator;
                throughputResults[j] = this.HistoricalThroughput[randomIndex];
            }

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            super.addSimulationResult(simulatedNumberOfItemsCompleted, this.numberOfDays);
        }
    }

    private addItems(throughputResults: number[]): number {
        var total = 0;
        for (var value of throughputResults)
            total += value;
        return total;
    }
}