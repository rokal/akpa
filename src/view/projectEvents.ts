import { ExcelImportResult } from "../model/excelImportResult";
import { SimulationConfig } from "../model/simulation/simulationConfig";

export abstract class ProjectEvent{

}

export class ExistingProjectEvent extends ProjectEvent {
    constructor(public readonly Results:Array<ExcelImportResult>){
        super();        
    }
}

export class NewProjectEvent  extends ProjectEvent{
    constructor(public readonly Config:SimulationConfig){        
        super();
    }
} 
