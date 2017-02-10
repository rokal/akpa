/// <reference path="../../../typings/modules/xlsx/index.d.ts" />

import {DateRange} from "../dateRange";
import {DateValidator} from "../dateValidator";
import * as XLSX from "xlsx"; 

export class ExcelImporter{
    
    public get ErrorMessage(): string{
        return this.errorMessage;
    }
    private errorMessage: string;

    public get Headers(): Array<string>{
        let toto = this.headers.map((header, index, arr) => {
            return header[1];}
        );
        return toto;
    }
    private headers: Array<[number, string]>;

    private blob:Blob;
    private workbook: XLSX.IWorkBook;
    private firstSheet: XLSX.IWorkSheet;

    constructor(public readonly Filename:string, data:Blob){
        this.headers = new Array<[number, string]>(0);
        this.errorMessage = "";
        this.blob = data;
    }

    readHeaders():void{
        this.loadFile(true);
        this.decodeHeaders();
    }

    readCompleteFile(startColumn:string, endColumn:string):void{
        this.loadFile(false);
        this.decodeEntireFile(startColumn, endColumn);
    }

    private decodeHeaders(): void{

        // This is a hack because there's a problem with the .d.ts file of
        // the xlsx-js module. According to the documentation, '!ref' returns
        // the range of the worksheet. We use this to read the columns.          
        let rangeOfHeaders = this.firstSheet['!ref'] as any;
        let rangeNumeric = XLSX.utils.decode_range(rangeOfHeaders);
        
        // This link explains how the range works in numeric style
        // https://github.com/SheetJS/js-xlsx#workbook--worksheet--cell-object-description
        let R = rangeNumeric.s.r as number; 
        
        // Walk every column in the range
        for(let C = rangeNumeric.s.c; C <= rangeNumeric.e.c; ++C) {
            // find the cell in the first row */
            let cell = this.firstSheet[XLSX.utils.encode_cell({c:C, r:R})]; 

            let hdr = "UNKNOWN at C" + C; // <-- replace with your desired default 
            if (cell && cell.t) 
                hdr = cell.v;

            this.headers.push([C, hdr]);
        }
    }

    private decodeEntireFile(startColumnName:string, endColumnName:string): Array<[DateRange, Array<string>]>{
        let rangeOfHeaders = this.firstSheet['!ref'] as any;
        var rangeNumeric = XLSX.utils.decode_range(rangeOfHeaders);
        
        // This link explains how the range works in numeric style
        // https://github.com/SheetJS/js-xlsx#workbook--worksheet--cell-object-description
        let R = rangeNumeric.s.r as number;
        let C = rangeNumeric.s.c as number; 

        let startColumnIndex = this.getIndex(startColumnName);
        let endColumnIndex= this.getIndex(endColumnName);

        let dates = new Array<[DateRange, Array<string>]>(0);
        let startDate:Date | undefined;
        let startCell: XLSX.IWorkSheetCell;        
        let endDate:Date| undefined;
        let endCell: XLSX.IWorkSheetCell;        
        let result:[DateRange, Array<string>];
        
        for (; R < rangeNumeric.e.r; ++R){
            startCell = this.firstSheet[XLSX.utils.encode_cell({c:startColumnIndex, r:R})];
            endCell = this.firstSheet[XLSX.utils.encode_cell({c:endColumnIndex, r:R})];
            console.log("Row: " + R);

            result = DateValidator.process(
                startColumnName,
                startColumnIndex,
                startCell,
                endColumnName,
                endColumnIndex,
                endCell, 
                R)
            
            dates.push(result);
        }

        return dates;
    }

    private loadFile(onlyColumnHeaders:boolean):void{
        this.workbook = XLSX.read(
            this.blob, 
            {type:"binary",
            cellDates: true,
            sheetRows: onlyColumnHeaders ? 1 : 0,
        });
        
        // Check the number of work sheets in the Excel file.
        // If there isn't any, clean up the importer and put
        // and error message in the property ErrorMessage.
        if (this.workbook.SheetNames.length == 0){
            this.cleanupImporter(`No works sheets in file ${this.Filename}`)
            return;
        }        
        
        // Grab the name of the first work sheet and assign it to a data member
        let first_sheet_name = this.workbook.SheetNames[0];        
        this.firstSheet = this.workbook.Sheets[first_sheet_name];        
    }

    private cleanupImporter(errorMessage: string): void{
        this.headers = new Array<[number,string]>(0);
        this.errorMessage = errorMessage;
    }

    private getIndex(columnName:string): number{
        let index = -1;

        for (let header of this.headers) {
            if (header[1] == columnName){
                index = header[0];
                break;
            }                
        }

        return index;
    }
}