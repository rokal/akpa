/// <reference path="../../../typings/modules/xlsx/index.d.ts" />

import * as XLSX from "xlsx"; 

export class ExcelLoader{

    public get Columns(): Array<String>{
        return this.columns;
    }
    private columns: Array<String>

    private blob:Blob;

    constructor(public readonly Filename:string, data:Blob){
        this.columns = new Array<String>();
        this.blob = data;
    }

    load():void{
        let workbook: XLSX.IWorkBook;
        let sheet: XLSX.IWorkSheet
        workbook = XLSX.read(
            this.blob, 
            {type:"binary",
            cellDates: true,
            sheetRows:1,

        });
        
        let first_sheet_name = workbook.SheetNames[0];
        sheet = workbook.Sheets[first_sheet_name];
        let toto = sheet['!ref'] as any;
        //let t = toto.v

        var range = XLSX.utils.decode_range(toto);
        var C, R = range.s.r; /* start in the first row */
        /* walk every column in the range */
        for(C = range.s.c; C <= range.e.c; ++C) {
            let cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

            let hdr = "UNKNOWN " + C; // <-- replace with your desired default 
            if(cell && cell.t) hdr = cell.v;

            this.columns.push(hdr);
        }
         console.log(this.columns);
            // if(rABS) {
            //     /* if binary string, read with type 'binary' */
            
        //     // } else {
        //     //     /* if array buffer, convert to base64 */
        //     //     var arr = fixdata(data);
        //     //     workbook = XLSX.read(btoa(arr), {type: 'base64'});
        //     // }

        //     /* DO SOMETHING WITH workbook HERE */
        // };
        // fileReader.onloadend = function (e: any) {
        //     console.log("File load " + e);
        // }
        // 
    }
}