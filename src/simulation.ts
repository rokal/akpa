import {Forecast} from "./forecast";
import {SimulationResult} from "./simulationResult";
import {ThroughputFrequency} from "./throughputFrequencyEnum";

export abstract class Simulation {

    private initial_number_of_simulations = 10000;

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

    public get ThroughputFrequency(): ThroughputFrequency {
        return this.throughputFrequency;
    }
    private throughputFrequency: ThroughputFrequency

    public get SimulationResults(): Array<SimulationResult> {
        return this.simulationResults;
    }
    protected simulationResults: Array<SimulationResult>;

    constructor(numberOfSimulations : number, throughputFrequency: ThroughputFrequency) {

        this.NumberOfSimulations = numberOfSimulations;
        this.throughputFrequency = throughputFrequency;
        this.simulationResults = new Array<SimulationResult>();

        this.historicalThroughput = [2, 7, 3, 9, 0, 3, 6, 8, 3];
    }

    abstract execute(): void;

    protected addSimulationResult(numberOfItemsCompleted: number, numberOfDays: number): void {

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
}