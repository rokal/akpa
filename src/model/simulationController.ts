import { DateRange } from "./dateRange"
import { ExcelImportResult } from "./io/excelImportResult";
import { Forecast} from "./forecast";
import { ForecastDateBuilder } from "./forecastDateBuilder";
import { SimulationConfig } from "./simulationConfig";
import { SimulationDate } from "./simulationDate";
import { ThroughputBuilder } from "./throughputBuilder";
import { ThroughputFrequency } from "./throughputFrequencyEnum";

export class SimulationController {

    public set NumberOfDays(value:number){
        this.simulationConfig.NumberOfDays = value; 
    }    
    public get NumberOfDays():number{
        return this.simulationConfig.NumberOfDays;
    }

    public set StartDate(value:Date){
        this.simulationConfig.StartDate = value;
    }
    public get StartDate():Date{
        return this.simulationConfig.StartDate;
    }

    private simulationConfig:SimulationConfig;        

    constructor(){
        this.simulationConfig = new SimulationConfig(
            new Array<number>(0),
            ThroughputFrequency.Day,
            new Date(),
            25,
            100,
            1000);
    }

    setResults(results: ExcelImportResult[]):void{
        let errorMessages = new Array<string>();
        let dates = new Array<DateRange>();
        for (let item of results) {

            if (item.Messages.length == 0)
                dates.push(item.Range);
            else
                errorMessages.concat(item.Messages);
        }

        // Build the throughputs
        this.simulationConfig.HistoricalThroughput = ThroughputBuilder.build(dates);

        // Return something for the error messages in Component
    }

    createDateSimulationForExistingProject(): Forecast[] {

        // Run the simulations   ;
        let simulation = new SimulationDate(this.simulationConfig);
        simulation.execute();

        let forecastBuilder = new ForecastDateBuilder(simulation.SimulationResults, simulation.NumberOfDays);
        forecastBuilder.createForecast();
        return forecastBuilder.Forecasts;
    }
}