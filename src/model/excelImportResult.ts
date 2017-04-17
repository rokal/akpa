import {DateRange} from "./dateRange";

export class ExcelImportResult{

    public get Range():DateRange{
        return this.range;
    }
    private range:DateRange;

    constructor(startDate:Date,
                endDate:Date,
                public readonly RowIndex:number,
                public readonly Messages:Array<string>){        
        this.range = new DateRange(startDate,endDate);
    }
}