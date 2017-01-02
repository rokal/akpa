import {Forecast} from "forecast";
import {SimulationResult} from "simulationResult";

export abstract class Simulation {

    private initial_number_of_simulations = 10000;

    //private ThroughputReader throughputReader;
    //private SimulationResultsWriter resultsWriter;

    public get NumberOfSimulations() :number {  
        return this.numberOfSimulations; 
    }
    public set NumberOfSimulations(number: number) {
        this.numberOfSimulations = number;
    }
    private numberOfSimulations: number;

    public get HistoricalThroughput(): number[] {
        return this.historicalThroughput;
    }
    public set HistoricalThroughput(throughputs: number[]) {
        this.historicalThroughput = throughputs;
    }
    private historicalThroughput: Array<number>;

    public get RandomIndexGenerator(): number {
        return Math.floor(Math.random() * this.historicalThroughput.length);
    }

    protected simulationResults: Array<SimulationResult>;

    constructor(numberOfSimulations : number) {

        this.NumberOfSimulations = numberOfSimulations;
        this.simulationResults = new Array<SimulationResult>(numberOfSimulations);

        this.historicalThroughput = [2, 7, 3, 9, 0, 3, 6, 8, 3];
    }

    abstract execute(): void;

    protected addSimulationResult(numberOfItemsCompleted: Number, numberOfDays: Number): void {

        var list = this.simulationResults.filter(result => result.NumberOfItemsCompleted == numberOfItemsCompleted);
                         
        if (list.length == 0) {
            this.simulationResults.push(new SimulationResult(numberOfItemsCompleted, numberOfDays));
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