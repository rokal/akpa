import {SimulationResult} from "../src/simulationResult";

export class SimulationResultsGenerator {

    private DEFAULT_SIMULATIONS = 1000;
    private DEFAULT_DAYS = 30;
    private DEFAULT_ITEMS = 100;
    private DEFAULT_LENGTH = 1000;

    private numberOfSimulations : number;
    private simulationResults : Array<SimulationResult>;

    constructor(numberOfSimulations: number){
        this.numberOfSimulations = numberOfSimulations;        
    }

    createSimulationResultsWithFixedDate(numberOfDays: number): Array<SimulationResult>{
        // Variables used in the inner for
        let throughputResults = new Array<number>(numberOfDays);
        let randomIndex: number;
        let simulatedNumberOfItemsCompleted: number;

        this.simulationResults = new Array<SimulationResult>(0);

        // Produce X simulations
        for (var i = 0; i < this.numberOfSimulations; i++) {

            // At each simulation, generate random througputs based on the historical values
            for (var j = 0; j < numberOfDays; j++) {
                throughputResults[j] = this.RandomPositiveIntegerGenerator(10);
            }

            simulatedNumberOfItemsCompleted = throughputResults.reduce( (lastSum, value) => lastSum + value);

            this.addSimulationResult(simulatedNumberOfItemsCompleted, numberOfDays);
        }

        return this.simulationResults;
    }

    private addSimulationResult(numberOfItemsCompleted: Number, numberOfDays: Number): void {

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

    private RandomPositiveIntegerGenerator(maxLength : number) : number{
         if (maxLength == undefined || maxLength == null)
            return Math.floor(Math.random() * this.DEFAULT_LENGTH);
        else
            return Math.floor(Math.random() * maxLength);
    }
}