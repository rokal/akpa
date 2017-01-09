import {ForecastBuilder} from "./ForecastBuilder";
import {ForecastDate} from "./ForecastDate";
import {Percentile} from "Percentile";
import {SimulationResult} from "SimulationResult";

export class ForecastDateBuilder extends ForecastBuilder {

    private numberOfDays: number;

    constructor(simulationResults: Array<SimulationResult>,
                numberOfDays: number){
        super(simulationResults);

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
                    this.Forecasts.push(new ForecastDate(percentile, result.NumberOfItemsCompleted, this.numberOfDays));
                    break;
                }                    
            }

        }
    }
}