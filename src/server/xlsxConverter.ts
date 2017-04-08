/// <reference path="../../typings/modules/xlsx/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import * as XLSX from "xlsx";
import * as fs from "fs";

export class XlsxConverter {

    private workbook: XLSX.IWorkBook;
    private firstSheet: XLSX.IWorkSheet;

    private EMPTY_JSON = [];

    constructor() {
    }

    // https://github.com/SheetJS/js-xlsx#json
    public getJson(filename:string):{}[]{

        if (this.isValidParameter(filename))
            return this.EMPTY_JSON;

        if (!fs.existsSync(filename))
            return this.EMPTY_JSON

        this.workbook = XLSX.readFile(
            filename,
            {
                type: "binary",
                cellDates: true,
                sheetRows: 0,
            });        

        // Check the number of work sheets in the Excel file.
        // If there isn't any, return an empty JSON
        if (this.workbook.SheetNames.length == 0) {
            return this.EMPTY_JSON;
        }

        // Grab the name of the first work sheet and assign it to a data member
        let first_sheet_name = this.workbook.SheetNames[0];        
        this.firstSheet = this.workbook.Sheets[first_sheet_name];

        return XLSX.utils.sheet_to_json(this.firstSheet,{
            raw:false,
            range: this.firstSheet['!ref'],
            header:"A"            
        }); 
    }

    private isValidParameter(filename:string):boolean{
         return ( filename == "" || filename == undefined)
    }
}