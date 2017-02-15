/// <reference path="../typings/globals/jest/index.d.ts" />

import {Utilities} from "../src/utilities";

describe("Utilities test suite", () => {

    let data;
    test("convertToInt tests", () => {

        data = Utilities.convertToInt(42);
        expect(data.isInteger).toBeTruthy();
        expect(data.value).toBe(42);

        data = Utilities.convertToInt("42");
        expect(data.isInteger).toBeTruthy();
        expect(data.value).toBe(42);

        data = Utilities.convertToInt("42.0");
        expect(data.isInteger).toBeTruthy();
        expect(data.value).toBe(42);

        data = Utilities.convertToInt(" 1 ");
        expect(data.isInteger).toBeTruthy();
        expect(data.value).toBe(1);

        data = Utilities.convertToInt("42.1");
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();

        data = Utilities.convertToInt("4e2a");
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();

        data = Utilities.convertToInt("1a");
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();

        data = Utilities.convertToInt(undefined);
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();

        data = Utilities.convertToInt(null);
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();

        data = Utilities.convertToInt(NaN);
        expect(data.isInteger).toBeFalsy();
        expect(data.value).toBeUndefined();
    });
});