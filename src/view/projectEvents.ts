import { ExcelImportResult } from "../model/io/excelImportResult";
import { SimulationConfig } from "../model/simulationConfig";

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
