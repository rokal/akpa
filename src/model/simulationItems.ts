import {Simulation} from "./simulation";
import {SimulationConfig} from "./simulationConfig";
import {ThroughputFrequency} from "./throughputFrequencyEnum";

export class SimulationItems extends Simulation{

    constructor(config:SimulationConfig) {  
        super(config)
    }

    execute(): void{

        // Variables used in function
        var throughputResults: number[] = new Array(this.NumberOfDays);
        var simulatedNumberOfDaysCompleted: number;

        // Produce X simulations
        for (var i = 0; i < this.NumberOfSimulations; i++) {

            // At each simulation, generate a number of days needed to 
            // complete the X number of items as specified in the SimulationConfig
            // object include in the parent class.
            simulatedNumberOfDaysCompleted = this.generateNumberOfDays();

            super.addSimulationResult(this.NumberOfItems, 
                                      simulatedNumberOfDaysCompleted,
                                      (result) => {return simulatedNumberOfDaysCompleted == result.NumberOfDays});
        }
    }

    private generateNumberOfDays(): number{

        let throughputResults: number[];
        let randomIndex: number;
        let simulatedNumberOfItems = 0;
        let numberOfDays = 0;

        while (simulatedNumberOfItems < this.NumberOfItems){

            randomIndex = this.RandomIndexGenerator;
            simulatedNumberOfItems = this.HistoricalThroughput[randomIndex] + simulatedNumberOfItems;

            numberOfDays = numberOfDays + 1;

            // This if condition is there in case we didn't have enough historical
            // data to produce a simulation. This shouldn't really happen but you...
            if (numberOfDays == 1000){
                break;
            }            
        }

        return numberOfDays;
    }
}