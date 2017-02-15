/// <reference path="../../typings/globals/moment/index.d.ts" />

import { DateRange } from "./dateRange";
import {ExcelImportResult} from "./io/excelImportResult";
import * as XLSX from "xlsx";
import * as moment from "moment";

export class DateValidator {

    public static DEFAULT_DATE = new Date(0, 0, 0, 0, 0, 0, 0);

    private constructor(){        
    }

    static process(startColumnName: string,
        startColumnIndex: number,
        startCell: XLSX.IWorkSheetCell | undefined,
        endColumnName: string,
        endColumnIndex: number,
        endCell: XLSX.IWorkSheetCell | undefined,
        rowIndex: number): ExcelImportResult {

        let errorMessages = new Array<string>(0);
        let startDate = moment();
        let endDate = moment();
        let tempMessage: string;
        let isBothCellsAreNotEmpty = true;

        if (startCell === undefined) {
            startDate = moment(this.DEFAULT_DATE);
            tempMessage = this.format(this.MSG_CELL_UNDEFINED, startColumnName, startColumnIndex.toString(), rowIndex.toString());
            errorMessages.push(tempMessage);
            isBothCellsAreNotEmpty = false;
        }
        else
            startDate = this.parseCell(startCell, startColumnName, startColumnIndex, rowIndex, errorMessages);

        if (endCell === undefined) {
            endDate = moment(this.DEFAULT_DATE);
            tempMessage = this.format(this.MSG_CELL_UNDEFINED, endColumnName, endColumnIndex.toString(), rowIndex.toString());
            errorMessages.push(tempMessage);
            isBothCellsAreNotEmpty = false;
        }
        else
            endDate = this.parseCell(endCell, endColumnName, endColumnIndex, rowIndex, errorMessages)        

        if (isBothCellsAreNotEmpty &&
            startDate > endDate) {
            tempMessage = this.format(this.MSG_START_GREATER_END, startDate.toISOString(), endDate.toISOString(), rowIndex);
            errorMessages.push(tempMessage);
        }

        return new ExcelImportResult(startDate.toDate(),
                                     endDate.toDate(),
                                     rowIndex,
                                     errorMessages);
    }

    private static MSG_CELL_UNDEFINED = "Cell in column {0}[Index:{1}] at row {2} is empty";
    private static MSG_INVALID_DATE = "Value is invalid [{0}] at column {1}[Index{2]} on row {3}]"
    private static MSG_START_GREATER_END = "Start date[{0}] greater than end date[{1}] on row {2}";
    private static UNFORMATTED_FORMATS = ["MM{0}DD{0}YYYY", "DD{0}MM{0}YYYY", "YYYY{0}MM{0}DD", "YYYY{0}DD{0}MM"];
    private static DEFAULT_FORMATS = DateValidator.buildFormats();

    private static buildFormats(): Array<string> {
        let formats = new Array<string>(0);

        let temp = this.UNFORMATTED_FORMATS.map((value) => { return this.format(value, "/"); });

        for (let item of temp)
            formats.push(item);

        temp = this.UNFORMATTED_FORMATS.map((value) => { return this.format(value, "-"); });

        for (let item of temp)
            formats.push(item);

        return formats;
    }

    private static parseCell(cell: XLSX.IWorkSheetCell,
            columnName:string,
            columnIndex:number,
            rowIndex:number,
            errorMessages: Array<string>): any {
        let stringToParse: string;
        if (cell.w === undefined ||
            cell.w == "") {
            // The formatted text is empty
            stringToParse = cell.v;
        }
        else
            stringToParse = cell.w;

        let validDate = moment(stringToParse, this.DEFAULT_FORMATS);
        if (!validDate.isValid() || 
            validDate.year() > 2030){
            let tempMessage = this.format(this.MSG_INVALID_DATE, stringToParse, columnName, columnIndex, rowIndex)
            errorMessages.push(tempMessage);
            return moment(this.DEFAULT_DATE);
        }       
        else
            return validDate;
    }

    private static format(stringToFormat: string, ...restOfParameters: any[]): string {
        let i = restOfParameters.length;

        while (i--) {
            stringToFormat = stringToFormat.replace(new RegExp('\\{' + i + '\\}', 'gm'), restOfParameters[i]);
        }
        return stringToFormat;
    };
}