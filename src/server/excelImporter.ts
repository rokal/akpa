/// <reference path="../../typings/modules/xlsx/index.d.ts" />

import { DateRange } from "./dateRange";
import { DateValidator } from "./dateValidator";
import { ExcelImportResult } from "./excelImportResult";
import * as XLSX from "xlsx";

export class ExcelImporter {

    public get ErrorMessage(): string {
        return this.errorMessage;
    }
    private errorMessage: string;

    private blob: File;

    private headers: Array<[number, string]>;

    private startColumnName: string;
    private endColumnName: string;
    private fileRead: boolean;
    private exportResults: Array<ExcelImportResult>;

    private workbook: XLSX.IWorkBook;
    private firstSheet: XLSX.IWorkSheet;

    constructor(public readonly Filename: string, ) {
        this.headers = new Array<[number, string]>(0);
        this.blob = new File([], this.Filename);
        this.errorMessage = "";
        this.fileRead = false;
        this.startColumnName = "";
        this.endColumnName = "";
        this.exportResults = new Array<ExcelImportResult>(0);
    }

    readHeaders(data?: File): Array<string> {
        if (data == undefined)
            this.loadFile(true);
        else {
            this.blob = data;
            this.loadBlob(data, true);
        }
        this.decodeHeaders();

        let headersName = this.headers.map((header, index, arr) => { return header[1]; });

        return headersName;
    }

    readCompleteFile(startColumn: string, endColumn: string): Array<ExcelImportResult> {

        if (this.isReadingSameData(startColumn, endColumn))
            return this.exportResults;

        if (this.isBlobEmpty())
            this.loadFile(false);
        else
            this.loadBlob(this.blob, false);

        this.exportResults = this.decodeEntireFile(startColumn, endColumn);
        this.fileRead = true;

        return this.exportResults;
    }

    private decodeHeaders(): void {

        // This is a hack because there's a problem with the .d.ts file of
        // the xlsx-js module. According to the documentation, '!ref' returns
        // the range of the worksheet. We use this to read the columns.          
        let rangeOfHeaders = this.firstSheet['!ref'] as any;
        if (rangeOfHeaders == undefined)
            return;

        let rangeNumeric = XLSX.utils.decode_range(rangeOfHeaders);

        // This link explains how the range works in numeric style
        // https://github.com/SheetJS/js-xlsx#workbook--worksheet--cell-object-description
        let R = rangeNumeric.s.r as number;

        // Walk every column in the range
        for (let C = rangeNumeric.s.c; C <= rangeNumeric.e.c; ++C) {
            // find the cell in the first row */
            let cell = this.firstSheet[XLSX.utils.encode_cell({ c: C, r: R })];

            let hdr = "UNKNOWN at C" + C; // <-- replace with your desired default 
            if (cell && cell.t)
                hdr = cell.v;

            this.headers.push([C, hdr]);
        }
    }

    private decodeEntireFile(startColumnName: string, endColumnName: string): Array<ExcelImportResult> {
        let rangeOfHeaders = this.firstSheet['!ref'] as any;
        if (rangeOfHeaders == undefined)
            return new Array<ExcelImportResult>(0);

        var rangeNumeric = XLSX.utils.decode_range(rangeOfHeaders);

        // This link explains how the range works in numeric style
        // https://github.com/SheetJS/js-xlsx#workbook--worksheet--cell-object-description
        let R = rangeNumeric.s.r as number;
        let C = rangeNumeric.s.c as number;

        this.startColumnName = startColumnName;
        this.endColumnName = endColumnName;
        let startColumnIndex = this.getIndex(startColumnName);
        let endColumnIndex = this.getIndex(endColumnName);

        let importResult = new Array<ExcelImportResult>(0);
        let startDate: Date | undefined;
        let startCell: XLSX.IWorkSheetCell;
        let endDate: Date | undefined;
        let endCell: XLSX.IWorkSheetCell;
        let result: ExcelImportResult;

        for (; R < rangeNumeric.e.r; ++R) {

            startCell = this.firstSheet[XLSX.utils.encode_cell({ c: startColumnIndex, r: R })];
            endCell = this.firstSheet[XLSX.utils.encode_cell({ c: endColumnIndex, r: R })];

            if (R == rangeNumeric.s.r)
                continue;

            result = DateValidator.process(
                startColumnName,
                startColumnIndex,
                startCell,
                endColumnName,
                endColumnIndex,
                endCell,
                R)

            importResult.push(result);
        }

        return importResult;
    }

    private loadBlob(data: Blob, onlyColumnHeaders: boolean): void {
        this.workbook = XLSX.read(
            data,
            {
                type: "binary",
                cellDates: true,
                sheetRows: onlyColumnHeaders ? 1 : 0,
            });

        this.load();
    }

    private loadFile(onlyColumnHeaders: boolean): void {
        this.workbook = XLSX.readFile(
            this.Filename,
            {
                type: "binary",
                cellDates: true,
                sheetRows: onlyColumnHeaders ? 1 : 0,
            });

        this.load();
    }

    private load(): void {

        // Check the number of work sheets in the Excel file.
        // If there isn't any, clean up the importer and put
        // and error message in the property ErrorMessage.
        if (this.workbook.SheetNames.length == 0) {
            this.cleanupImporter(`No works sheets in file ${this.Filename}`)
            return;
        }

        // Grab the name of the first work sheet and assign it to a data member
        let first_sheet_name = this.workbook.SheetNames[0];
        this.firstSheet = this.workbook.Sheets[first_sheet_name];
    }

    private isReadingSameData(startColumn: string, endColumn: string): boolean {
        if (this.fileRead &&
            this.startColumnName == startColumn &&
            this.endColumnName == endColumn)
            return true;
        else
            return false;
    }

    private cleanupImporter(errorMessage: string): void {
        this.headers = new Array<[number, string]>(0);
        this.errorMessage = errorMessage;
    }

    private isBlobEmpty(): boolean {
        return this.blob.size == 0;
    }

    private getIndex(columnName: string): number {
        let index = -1;

        for (let header of this.headers) {
            if (header[1] == columnName) {
                index = header[0];
                break;
            }
        }

        return index;
    }
}