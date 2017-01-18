/// <reference path="../typings/globals/jest/index.d.ts" />

import {Utilities} from "../src/utilities";

describe("Utilities test suite", () => {

    let output: number | null;
    it("convertToInt tests", () => {

        expect(Utilities.convertToInt(42,output)).toBe(42);
    });
});