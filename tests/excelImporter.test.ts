/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="../typings/globals/jest/index.d.ts" />

import fs = require("fs");
import {ExcelImporter} from "../src/model/io/excelImporter";

describe("ExcelImporter test suite", () => {


    test ("Read headers of Excel spreadsheets", () => {
        let filenameToTest = "./tests/data/Excel_2007_Xlsx_TestSheet.xlsx"; 

        let excelImporter = new ExcelImporter(filenameToTest);
        let columns = excelImporter.readHeaders();

        expect(columns).not.toBeNull();
        expect(columns.length).toEqual(11);
    })   

    test("Read file of Excel spreadsheets", () => {

        let filenameToTest = "./tests/data/Excel_2010_Xlsx_TestSheet.xlsx"; 

        let excelImporter = new ExcelImporter(filenameToTest);
        let columns = excelImporter.readHeaders();
        let results = excelImporter.readCompleteFile(columns[0], columns[columns.length-1]);

        expect(results).not.toBeNull();
        expect(results.length).not.toEqual(0);        
    }) 

    test ("Empty Excel spreadsheets", () => {

        let filesToTest = [
            "./tests/data/Excel_97_Empty.xls",
            "./tests/data/Excel_2007_Empty.xlsx"]; 

        for(let filename of filesToTest){
            let excelImporter = new ExcelImporter(filename);
            let columns = excelImporter.readHeaders();

            expect(columns).not.toBeNull();
            expect(columns.length).toEqual(0);
            
            let results = excelImporter.readCompleteFile("column1", "column2");
            expect(results).not.toBeNull();
            expect(results.length).toEqual(0);
        }        
    })

    test ("Check Filename property", () => {

        let expectedFilename = "toto";

        let excelImporter = new ExcelImporter(expectedFilename);

        expect(excelImporter.Filename).toEqual(expectedFilename);
    })
})
