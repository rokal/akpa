export class ExcelImportResult{

    constructor(public readonly Dates:Array<Date>,
                public readonly RowIndex:number,
                public readonly Messages:Array<string>){        
    }
}