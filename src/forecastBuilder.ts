import {Forecast} from "Forecast";
import {Percentile} from "./percentile";
import {SimulationResult} from "SimulationResult";

export abstract class ForecastBuilder{

    private initial_percentiles: Array<Percentile>;

    public get Forecasts(): Forecast[] {
        return this.forecasts;
    }
    public set Forecasts(forecasts: Forecast[]) {
        this.forecasts = forecasts;
    }
    private forecasts: Array<Forecast>;

    protected numberOfSimulations: number;
    protected simulationResults: Array<SimulationResult>;
    private percentiles: Array<Percentile>;

    constructor(simulationResults:Array<SimulationResult>, numberOfSimulations:number){
        this.simulationResults = simulationResults;        
        this.numberOfSimulations = numberOfSimulations;
        this.forecasts = new Array<Forecast>(0);

        this.initial_percentiles = new Array<Percentile>(5);
        this.initial_percentiles[0] = new Percentile(0.3);
        this.initial_percentiles[1] = new Percentile(0.5);
        this.initial_percentiles[2] = new Percentile(0.7);
        this.initial_percentiles[3] = new Percentile(0.85);
        this.initial_percentiles[4] = new Percentile(0.9);   

        this.percentiles = this.initial_percentiles;
    }

    abstract createForecast(): void;

    protected orderSimulationResults(): Array<SimulationResult> {
        var sortedArray: Array<SimulationResult> = this.simulationResults.sort((n1:SimulationResult, n2:SimulationResult) => {
            if (n1.NumberOfItemsCompleted > n2.NumberOfItemsCompleted)
                return -1;
            else if (n1.NumberOfItemsCompleted < n2.NumberOfItemsCompleted)
                return 1;
            else
                return 0;
        });

        return sortedArray;

    }

    protected orderPercentiles(): Array<Percentile> {
        var sortedArray: Array<Percentile> = this.percentiles.sort((n1:Percentile, n2:Percentile) => {
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