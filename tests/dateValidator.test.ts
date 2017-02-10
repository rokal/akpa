/// <reference path="../typings/globals/jest/index.d.ts" />

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
    let startCellValid:XLSX.IWorkSheetCell = {t:"", v:"", w:"01/13/2014"};
    let endCellValid:XLSX.IWorkSheetCell = {t:"", v:"", w:"01/15/2014"};

    test("Undefined start cell test", () => {
        
        let actualValues = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          undefined,
                                          endColumnName,
                                          endColumnIndex,
                                          endCellValid,
                                          rowIndex);

        expect(actualValues[0].StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[0].EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[1]).not.toBeNull();
        expect(actualValues[1].length).not.toEqual(0);
    });

    test("Undefined end cell test", () => {
        
        let actualValues = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          startCellValid,
                                          endColumnName,
                                          endColumnIndex,
                                          undefined,
                                          rowIndex);

        expect(actualValues[0].StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[0].EndDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[1]).not.toBeNull();
        expect(actualValues[1].length).not.toEqual(0);
    });

    test("Start greater than end test", () => {

        let actualValues = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          endCellValid,
                                          endColumnName,
                                          endColumnIndex,
                                          startCellValid,
                                          rowIndex);
        
        expect(actualValues[0].StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[0].EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[1]).not.toBeNull();
        expect(actualValues[1].length).not.toEqual(0);
    });

    test.only("Invalid start cell test", () => {

        let actualValues = DateValidator.process(startColumnName,
                                          startColumnIndex,
                                          startCellInvalid,
                                          endColumnName,
                                          endColumnIndex,
                                          endCellValid,
                                          rowIndex);
        
        expect(actualValues[0].StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[0].EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualValues[1]).not.toBeNull();
        expect(actualValues[1].length).not.toEqual(0);
    });    
});