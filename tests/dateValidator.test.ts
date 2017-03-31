/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../typings/modules/xlsx/index.d.ts" />

import {DateValidator} from "../src/model/dateValidator";
import * as XLSX from "xlsx"; 

describe("DateValidator test suite", () => {

    let startColumnName = "Start column";
    let startColumnIndex = 0;
    let endColumnName = "End column";
    let endColumnIndex = 5;
    let rowIndex = 2;

    let defaultEmptyCell: XLSX.IWorkSheetCell = {t: "", v: ""};
    let startCellInvalid:XLSX.IWorkSheetCell = {t:"", v:"45067", w:""};
    let startCellValid:XLSX.IWorkSheetCell = {t:"", v:"", w:"01/15/2014"};
    let endCellValid:XLSX.IWorkSheetCell = {t:"", v:"", w:"Jan 30 2017"};    

    let startCellValid_Format_Vacanti:XLSX.IWorkSheetCell = {t:"", v:"", w:"01/13/2014"};
    let endCellValid_Format_Vacanti:XLSX.IWorkSheetCell = {t:"", v:"", w:"Feb 05 2017"};


    test("Undefined start cell test", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          undefined,
                                          endColumnName,
                                          endColumnIndex,
                                          endCellValid,
                                          rowIndex);

        expect(actualResult.Range.StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Test with Actionable Agile format", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          startCellValid_Format_Vacanti,
                                          endColumnName,
                                          endColumnIndex,
                                          endCellValid_Format_Vacanti,
                                          rowIndex);

        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).toEqual(0);
    });

    test("Undefined end cell test", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          startCellValid,
                                          endColumnName,
                                          endColumnIndex,
                                          undefined,
                                          rowIndex);

        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).toEqual(DateValidator.DEFAULT_DATE);        
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Start greater than end test", () => {

        let actualResult = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          endCellValid,
                                          endColumnName,
                                          endColumnIndex,
                                          startCellValid,
                                          rowIndex);
        
        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();        
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Invalid start cell test", () => {

        let actualResult = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          startCellInvalid,
                                          endColumnName,
                                          endColumnIndex,
                                          endCellValid,
                                          rowIndex);
        
        expect(actualResult.Range.StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });    
});