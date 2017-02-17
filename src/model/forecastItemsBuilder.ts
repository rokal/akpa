import { ForecastBuilder } from "./forecastBuilder";
import { ForecastItems } from "./forecastItems";
import { Percentile } from "./percentile";
import { SimulationResult } from "./simulationResult";

export class ForecastItemsBuilder extends ForecastBuilder {

    private numberOfItems: number;

    constructor(simulationResults: Array<SimulationResult>,
        numberOfItems: number) {
        super(simulationResults);

        this.numberOfItems = numberOfItems;
    }

    createForecast(): void {
        var orderedAscResults = super.orderSimulationResultsByDate();
        var orderedAscPercentiles = super.orderPercentiles();

        var counter = 0;
        var numberOfOccurences = 0;

        for (var percentile of orderedAscPercentiles) {
            counter = 0;
            numberOfOccurences = Math.round(percentile.value * this.numberOfSimulations);

            for (var result of orderedAscResults) {
                counter += result.Occurences;
                if (counter >= numberOfOccurences) {
                    this.Forecasts.push(new ForecastItems(percentile, this.numberOfItems, result.NumberOfDays));
                    break;
                }
            }
        }
    }
}