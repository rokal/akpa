import { DateRange } from "./dateRange"
import { ExcelImportResult } from "./io/excelImportResult";
import { ForecastDate} from "./forecastDate";
import { ForecastDateBuilder } from "./forecastDateBuilder";
import { ForecastItems} from "./forecastItems";
import { ForecastItemsBuilder } from "./forecastItemsBuilder";
import { SimulationConfig } from "./simulationConfig";
import { SimulationDate } from "./simulationDate";
import { SimulationItems } from "./simulationItems";
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

    public set NumberOfItems(value:number){
        this.simulationConfig.NumberOfItems = value;
    }

    private validDates:Array<DateRange>;
    private errorResults:Array<ExcelImportResult>;

    private simulationConfig:SimulationConfig;        

    constructor(){
        this.validDates = new Array<DateRange>(0);
        this.errorResults = new Array<ExcelImportResult>(0);
        this.simulationConfig = SimulationConfig.Empty;
    }

    buildValidDates(results: ExcelImportResult[]):void{
        this.errorResults = new Array<ExcelImportResult>(0);
        this.validDates = new Array<DateRange>(0);
        for (let item of results) {

            if (item.Messages.length == 0)
                this.validDates.push(item.Range);
            else
                this.errorResults.push(item);
        }
    }

    getImportErrors():Array<ExcelImportResult>{
        return this.errorResults;
    }

    buildThroughputs():void{
        // Build the throughputs
        this.simulationConfig.HistoricalThroughput = ThroughputBuilder.build(this.validDates);
    }

    createDateSimulationForExistingProject(): ForecastDate[] {

        // Run the simulations
        let simulation = new SimulationDate(this.simulationConfig);
        simulation.execute();

        let forecastBuilder = new ForecastDateBuilder(simulation.SimulationResults, simulation.NumberOfDays);
        forecastBuilder.createForecast();
        return forecastBuilder.Forecasts;
    }

    createItemsSimulationForExistingProject(): ForecastItems[] {

        // Run the simulations
        let simulation = new SimulationItems(this.simulationConfig);
        simulation.execute();

        let forecastBuilder = new ForecastItemsBuilder(simulation.SimulationResults, simulation.NumberOfItems);
        forecastBuilder.createForecast();
        return forecastBuilder.Forecasts;
    }    
}