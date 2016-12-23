import {ForecastItems} from "ForecastItems";
import {Percentile} from "Percentile";
import {Simulation} from "Simulation";
import {SimulationResult} from "SimulationResult";

export class SimulationNumberOfDays extends Simulation{

    private _numberOfDays: number;

    constructor(numberOfDays: number, numberOfSimulations: number) {  
        super(numberOfSimulations)
        this._numberOfDays = numberOfDays;
    }

    execute(): void{


        // Variables used in the inner for
        var throughputResults: number[] = new Array(this._numberOfDays);
        var randomIndex: number;
        var simulatedNumberOfItemsCompleted: number;

        // Produce X simulations
        for (var i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate random througputs based on the historical values
            for (var j = 0; j < this._numberOfDays; j++) {
                randomIndex = this.RandomIndexGenerator;
                throughputResults[j] = this.HistoricalThroughput[randomIndex];
            }

            simulatedNumberOfItemsCompleted = this.addItems(throughputResults);

            this.addSimulationResult(simulatedNumberOfItemsCompleted, this._numberOfDays);
        }
    }

    private addItems(throughputResults: number[]): number {
        var total = 0;
        for (var value of throughputResults)
            total += value;
        return total;
    }

    createForecast(): void {

        var orderedDescResults = this.orderSimulationResults();
        var orderedAscPercentiles = this.orderPercentiles();

        var counter = 0;
        var numberOfOccurences = 0;

        for (var percentile of orderedAscPercentiles) {
            counter = 0;
            numberOfOccurences = Math.round(percentile.value * this.NumberOfSimulations);

            for (var result of orderedDescResults) {
                counter += result.Occurences;
                if (counter >= numberOfOccurences) {
                    this.Forecasts.push(new ForecastItems(percentile, result.NumberOfItemsCompleted, this._numberOfDays));
                    break;
                }                    
            }

        }
    }

    private orderSimulationResults(): Array<SimulationResult> {
        var sortedArray: Array<SimulationResult> = this._simulationResults.sort((n1:SimulationResult, n2:SimulationResult) => {
            if (n1.NumberOfItemsCompleted > n2.NumberOfItemsCompleted)
                return -1;
            else if (n1.NumberOfItemsCompleted < n2.NumberOfItemsCompleted)
                return 1;
            else
                return 0;
        });

        return sortedArray;

    }

    private orderPercentiles(): Array<Percentile> {
        var sortedArray: Array<Percentile> = this._percentiles.sort((n1:Percentile, n2:Percentile) => {
            if (n1.value > n2.value)
                return 1;
            else if (n1.value < n2.value)
                return -1;
            else
                return 0;
        });

        return sortedArray;
    }
}