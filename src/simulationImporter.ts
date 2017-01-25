import {SimulationConfig} from "./components/simulationConfig";
import {SimulationResult} from "./simulationResult";

export class SimulationImporter
{
    constructor(){
        throw new Error("SimulationImporter: Static class. It cannot be instanciated")
    }

    static import(data:String): {config: SimulationConfig, results: Array<SimulationResult>}{

        let config: SimulationConfig;
        let results: Array<SimulationResult>;

        config = JSON.parse(data as string, this.reviver);
        results = new Array<SimulationResult>(1);

        return {config, results};
    }

    private static reviver(key:any, data:any): any{
        // if (key == Object)
        //     console.info(`Key:${key.toString()} Data:${data.toString()}`);
        // else
        //     console.info(`Key:${key} Data:${data}`);
    }
    
}