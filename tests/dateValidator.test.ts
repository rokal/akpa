/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../typings/modules/xlsx/index.d.ts" />

import {DateValidator} from "../src/model/dateValidator";
import * as XLSX from "xlsx"; 

describe("DateValidator test suite", () => {

    let startColumnName = "Start column";
    let endColumnName = "End column";
    let rowIndex = 2;

    let defaultEmptyCell = "";
    let startCellValid = "01/15/2014";
    let startCellInvalid = "gsdfgfsfsg";
    let endCellValid = "Jan 30 2017";    

    let startCellValid_Format_Vacanti = "Mar 13 2017";
    let endCellValid_Format_Vacanti = "Mar 27 2017";

    test("Undefined start cell test", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          defaultEmptyCell,
                                          endColumnName,
                                          endCellValid,
                                          rowIndex);

        expect(actualResult.Range.StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Test with Actionable Agile format", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          startCellValid_Format_Vacanti,
                                          endColumnName,
                                          endCellValid_Format_Vacanti,
                                          rowIndex);

        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).toEqual(0);
    });

    test("Undefined end cell test", () => {
        
        let actualResult = DateValidator.process(startColumnName,
                                          startCellValid,
                                          endColumnName,
                                          defaultEmptyCell,
                                          rowIndex);

        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).toEqual(DateValidator.DEFAULT_DATE);        
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Start greater than end test", () => {

        let actualResult = DateValidator.process(startColumnName,
                                          endCellValid,
                                          endColumnName,
                                          startCellValid,
                                          rowIndex);
        
        expect(actualResult.Range.StartDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();        
        expect(actualResult.Messages.length).not.toEqual(0);
    });

    test("Invalid start cell test", () => {

        let actualResult = DateValidator.process(startColumnName,
                                          startCellInvalid,
                                          endColumnName,
                                          endCellValid,
                                          rowIndex);
        
        expect(actualResult.Range.StartDate).toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Range.EndDate).not.toEqual(DateValidator.DEFAULT_DATE);
        expect(actualResult.Messages).not.toBeNull();
        expect(actualResult.Messages.length).not.toEqual(0);
    });    
});