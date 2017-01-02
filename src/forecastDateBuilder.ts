import {ForecastBuilder} from "./ForecastBuilder";
import {ForecastItems} from "./ForecastItems";
import {Percentile} from "Percentile";
import {SimulationResult} from "SimulationResult";

export class ForecastDateBuilder extends ForecastBuilder {

    private numberOfDays: number;

    constructor(simulationResults: Array<SimulationResult>,
                numberOfSimulations: number,
                numberOfDays: number){
        super(simulationResults, numberOfSimulations);

        this.numberOfDays = numberOfDays;
    }

    createForecast(): void {
        var orderedDescResults = super.orderSimulationResults();
        var orderedAscPercentiles = super.orderPercentiles();

        var counter = 0;
        var numberOfOccurences = 0;

        for (var percentile of orderedAscPercentiles) {
            counter = 0;
            numberOfOccurences = Math.round(percentile.value * this.numberOfSimulations);

            for (var result of orderedDescResults) {
                counter += result.Occurences;
                if (counter >= numberOfOccurences) {
                    this.Forecasts.push(new ForecastItems(percentile, result.NumberOfItemsCompleted, this.numberOfDays));
                    break;
                }                    
            }

        }
    }
}