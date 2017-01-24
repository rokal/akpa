
import { SimulationConfig } from "./components/simulationConfig";
import { SimulationResult } from "./simulationResult";

import * as JSZip from "jszip";

export class SimulationExporter {

    constructor() {
        throw new Error("Static class")
    }

    static export(config: SimulationConfig, results: Array<SimulationResult>): String {

        let data: string;        

        let configJSON = JSON.stringify(config);
        let resultsJSON = JSON.stringify(results);

        data = `${this.HEADER_CONTENT},`+
               `{`+
               `     "SimulationConfig":${configJSON},`+
               `     "SimulationResults":${resultsJSON}`+
               `}`;

        return data;
    }

    static createFilename(config: SimulationConfig): String {
        return `Forecasts_`+
               `${config.StartDate.getDate()}_`+
               `${config.StartDate.getMonth() + 1}_`+
               `${config.StartDate.getFullYear()}`+
               `.json`;
    }

    static HEADER_CONTENT = "data:attachment/json"; 
}