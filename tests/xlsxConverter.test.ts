/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as fs from "fs";

import { XlsxConverter } from "../src/server/xlsxConverter";

describe("XlsxConverter test suite", () => {

    let xlsxConverter = new XlsxConverter();

    it("Convert Xls file to JSON", () => {
        
        let json = xlsxConverter.getJson("./tests/data/Analytics-data.xls"); 

        // let json = fs.readFileSync("./tests/data/json/jsonFromXlsFile.json", "utf-8");
        // let obj = JSON.parse(json);

        expect(json).not.toBeNull();
        expect(json.length).not.toEqual(0);
    })

    it("Convert Xlsx file to JSON", () => {
        
        let json = xlsxConverter.getJson("./tests/data/Excel_2007_Xlsx_TestSheet.xlsx"); 

        expect(json).not.toBeNull();
        expect(json.length).not.toEqual(0);
    })    

    it("Pass empty string", () => {
        
        let json = xlsxConverter.getJson(""); 

        expect(json).not.toBeNull();
        expect(json.length).toEqual(0);
    })    

})