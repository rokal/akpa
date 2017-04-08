/// <reference path="../../typings/modules/xlsx/index.d.ts" />

import * as XLSX from "xlsx";

export class XlsxConverter {

    private workbook: XLSX.IWorkBook;
    private firstSheet: XLSX.IWorkSheet;

    constructor() {
    }

    // https://github.com/SheetJS/js-xlsx#json
    public getJson(filename:string):{}[]{

        if (filename == "" ||
            filename == undefined)
            return [{}];

        this.workbook = XLSX.readFile(
            filename,
            {
                type: "binary",
                cellDates: true,
                sheetRows: 0,
            });        

        // Check the number of work sheets in the Excel file.
        // If there isn't any, clean up the importer and put
        // and error message in the property ErrorMessage.
        if (this.workbook.SheetNames.length == 0) {
            return [{x:1}];
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

}