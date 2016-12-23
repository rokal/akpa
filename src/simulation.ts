import {Forecast} from "forecast";
import {Percentile} from "percentile";
import {SimulationResult} from "simulationResult";

export abstract class Simulation {

    private initial_number_of_simulations = 10000;
    private initial_percentiles: Array<Percentile>;

    //private ThroughputReader throughputReader;
    //private SimulationResultsWriter resultsWriter;

    public get NumberOfSimulations() :number {  
        return this._numberOfSimulations; 
    }
    public set NumberOfSimulations(number: number) {
        this._numberOfSimulations = number;
    }
    private _numberOfSimulations: number;

    public get HistoricalThroughput(): number[] {
        return this._historicalThroughput;
    }
    public set HistoricalThroughput(throughputs: number[]) {
        this._historicalThroughput = throughputs;
    }
    private _historicalThroughput: Array<number>;

    public get Forecasts(): Forecast[] {
        return this._forecasts;
    }
    public set Forecasts(forecasts: Forecast[]) {
        this._forecasts = forecasts;
    }
    private _forecasts: Array<Forecast>;

    public get RandomIndexGenerator(): number {
        return Math.floor(Math.random() * this._historicalThroughput.length);
    }

    protected _simulationResults: Array<SimulationResult>;
    protected _percentiles: Array<Percentile>;


    constructor(numberOfSimulations : number) {
        this.initial_percentiles = new Array<Percentile>(5);
        this.initial_percentiles[0] = new Percentile(0.3);
        this.initial_percentiles[1] = new Percentile(0.5);
        this.initial_percentiles[2] = new Percentile(0.7);
        this.initial_percentiles[3] = new Percentile(0.85);
        this.initial_percentiles[4] = new Percentile(0.9);

        this.NumberOfSimulations = numberOfSimulations;
        this._simulationResults = new Array<SimulationResult>(numberOfSimulations);
        this._percentiles = this.initial_percentiles;
        this._forecasts = new Array<Forecast>(0);
        this._historicalThroughput = [2, 7, 3, 9, 0, 3, 6, 8, 3];
    }

    abstract execute(): void;

    abstract createForecast(): void;

    addSimulationResult(numberOfItemsCompleted: Number, numberOfDays: Number): void {

        var list = this._simulationResults.filter(result => result.NumberOfItemsCompleted == numberOfItemsCompleted);
                         
        if (list.length == 0) {
            this._simulationResults.push(new SimulationResult(numberOfItemsCompleted, numberOfDays));
        }
        else if (list.length == 1) {
            list[0].incrementOccurences();
        }
        else {
            throw new RangeError("Ayoye");
        }
    }

    printSimulationResult(): void {
        // some writer writes the forecasts and its simulation results
    }
}