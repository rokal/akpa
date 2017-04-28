/// <reference path="../../typings/globals/moment/index.d.ts" />

import { DateRange } from "./dateRange";
import {ExcelImportResult} from "./excelImportResult";
import * as moment from "moment";

export class DateValidator {

    public static DEFAULT_DATE = new Date(0, 0, 0, 0, 0, 0, 0);

    private constructor(){        
    }

    static process(startColumnName: string,
        startCell: string | undefined,
        endColumnName: string,
        endCell: string | undefined,
        rowIndex: number): ExcelImportResult {

        let errorMessages = new Array<string>(0);
        let startDate = moment();
        let endDate = moment();
        let tempMessage: string;
        let isBothCellsAreNotEmpty = true;

        if (startCell === undefined) {
            startDate = moment(this.DEFAULT_DATE);
            tempMessage = this.format(this.MSG_CELL_UNDEFINED, rowIndex + 1, startColumnName);
            errorMessages.push(tempMessage);
            isBothCellsAreNotEmpty = false;
        }
        else
            startDate = this.parseCell(startCell, startColumnName, -1, rowIndex, errorMessages);

        if (endCell === undefined) {
            endDate = moment(this.DEFAULT_DATE);
            tempMessage = this.format(this.MSG_CELL_UNDEFINED, rowIndex + 1, endColumnName);
            errorMessages.push(tempMessage);
            isBothCellsAreNotEmpty = false;
        }
        else
            endDate = this.parseCell(endCell, endColumnName, -1, rowIndex, errorMessages)        

        if (isBothCellsAreNotEmpty &&
            startDate > endDate) {
            tempMessage = this.format(this.MSG_START_GREATER_END, startDate.toISOString(), endDate.toISOString(), rowIndex + 1);
            errorMessages.push(tempMessage);
        }

        return new ExcelImportResult(startDate.toDate(),
                                     endDate.toDate(),
                                     rowIndex,
                                     errorMessages);
    }

    private static MSG_CELL_UNDEFINED = "Row {0}: Cell in column {1} is empty";
    private static MSG_INVALID_DATE = "Row {3}: Value is invalid [{0}] at column {1}[Index{2}]"
    private static MSG_START_GREATER_END = "Row {2}: Start date[{0}] greater than end date[{1}]";
    private static UNFORMATTED_FORMATS = ["MM{0}DD{0}YYYY", 
                                          "DD{0}MM{0}YYYY", 
                                          "YYYY{0}MM{0}DD", 
                                          "YYYY{0}DD{0}MM"];

    private static buildFormats(): Array<string> {
        let formats = new Array<string>(0);

        let temp = this.UNFORMATTED_FORMATS.map((value) => { return this.format(value, "/"); });

        for (let item of temp)
            formats.push(item);

        temp = this.UNFORMATTED_FORMATS.map((value) => { return this.format(value, "-"); });

        for (let item of temp)
            formats.push(item);

        formats.push("MMM DD YYYY");

        return formats;
    }

    private static DEFAULT_FORMATS = DateValidator.buildFormats();

    private static parseCell(stringToParse: string,
            columnName:string,
            columnIndex:number,
            rowIndex:number,
            errorMessages: Array<string>): any {

        let validDate = moment(stringToParse, this.DEFAULT_FORMATS);
        if (!validDate.isValid() || 
            validDate.year() > 2030){
            let tempMessage = this.format(this.MSG_INVALID_DATE, stringToParse, columnName, columnIndex, rowIndex + 1)
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