﻿import { Forecast } from "./forecast";
import { SimulationConfig } from "./simulationConfig";
import { SimulationResult } from "./simulationResult";
import { ThroughputFrequency } from "./throughputFrequencyEnum";

export abstract class Simulation {

    private initial_number_of_simulations = 10000;

    public get StartDate(): Date{
        return this.simulationConfig.StartDate;
    }

    public get NumberOfDays() : number{
        return this.simulationConfig.NumberOfDays;
    }

    public get DeliveryDate() : Date{
        return this.simulationConfig.DeliveryDate;
    }

    public get NumberOfSimulations(): number {
        return this.simulationConfig.NumberOfSimulations
    }

    public get ThroughputFrequency(): ThroughputFrequency {
        return this.simulationConfig.ThroughputFrequency;
    }

    public get HistoricalThroughput(): number[] {
        return this.historicalThroughput;
    }
    private historicalThroughput: Array<number>;

    public get SimulationResults(): Array<SimulationResult> {
        return this.simulationResults;
    }
    protected simulationResults: Array<SimulationResult>;

    protected get RandomIndexGenerator(): number {
        return Math.floor(Math.random() * this.historicalThroughput.length);
    }

    protected simulationConfig: SimulationConfig;

    constructor(config:SimulationConfig, 
                historicalThroughput: Array<number>) {

        this.simulationConfig = config;
        this.historicalThroughput = historicalThroughput;
        this.simulationResults = new Array<SimulationResult>();
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