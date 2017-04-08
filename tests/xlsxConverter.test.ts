/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as fs from "fs";

import { XlsxConverter } from "../src/server/xlsxConverter";

describe("XlsxConverter test suite", () => {

    it("Convert file", () => {

        let json = fs.readFileSync("./tests/data/json/jsonFromXlsFile.json", "utf-8");
        let obj = JSON.parse(json);

        expect(obj).not.toBeNull();
    })
})