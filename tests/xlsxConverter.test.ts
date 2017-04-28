/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as fs from "fs";

import { XlsxConverter } from "../src/server/xlsxConverter";

describe("XlsxConverter test suite", () => {

    let xlsxConverter = new XlsxConverter();

    it("Convert Xls file to JSON", () => {
        
        let json = xlsxConverter.getJson("./tests/data/Xlsx/Analytics-data.xls"); 

        expect(json).not.toBeNull();
        expect(json.length).not.toEqual(0);
    })

    it("Convert Xlsx file to JSON", () => {
        
        let json = xlsxConverter.getJson("./tests/data/Xlsx/Excel_2007_Xlsx_TestSheet.xlsx"); 

        expect(json).not.toBeNull();
        expect(json.length).not.toEqual(0);
    })    

    it("Convert with empty string as filename", () => {
        
        let json = xlsxConverter.getJson(""); 

        expect(json).not.toBeNull();
        expect(json.length).toEqual(0);
    })    

    it("Convert with non-existing file", () => {
        
        let json = xlsxConverter.getJson("./tests2/gazou.xlsx"); 

        expect(json).not.toBeNull();
        expect(json.length).toEqual(0);
    })
})