/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/jest/index.d.ts" />

import fs = require("fs");
import {ExcelImporter} from "../src/model/io/excelImporter";

describe("ExcelImporter test suite", () => {


    it ("Loader Excel 2007 Xlsx file", () => {
        let filenameToTest = "./tests/Excel_2007_Xlsx_TestSheet.xlsx"; 

        let input = document.createElement("input");
        let attr = document.createAttribute("type");
        attr.value = "file";
        input.attributes.setNamedItem(attr);

        // let content = fs.readFileSync(filenameToTest, "hex");
        // console.log(content);
        
        // let blob = new File(new Array<string>(content), filenameToTest);
    })    
})