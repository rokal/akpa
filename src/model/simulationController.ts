import { DateRange } from "./dateRange"
import { ExcelImportResult } from "./io/excelImportResult";
import { ForecastDateBuilder } from "./forecastDateBuilder";
import { SimulationConfig } from "./simulationConfig";
import { SimulationDate } from "./simulationDate";
import { ThroughputBuilder } from "./throughputBuilder";
import { ThroughputFrequency } from "./throughputFrequencyEnum";

export class SimulationController {
    createDateSimulationForExistingProject(results: ExcelImportResult[]) {

        let errorMessages = new Array<string>();
        let dates = new Array<DateRange>();
        for (let item of results) {

            if (item.Messages.length == 0)
                dates.push(item.Range);
            else
                errorMessages.concat(item.Messages);
        }

        // Put the error messages in Component

        // Build the throughputs
        let throughputs = ThroughputBuilder.build(dates);

        // Run the simulations   
        let config = new SimulationConfig(throughputs,
            ThroughputFrequency.Day,
            new Date(),
            25, 
            100, 
            1000);
        let simulation = new SimulationDate(config, throughputs);
        simulation.execute();

        let forecastBuilder = new ForecastDateBuilder(simulation.SimulationResults, 25);
        forecastBuilder.createForecast();
    }
}