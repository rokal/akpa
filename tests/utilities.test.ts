/// <reference path="../typings/globals/jest/index.d.ts" />

import {Utilities} from "../src/utilities";

describe("Utilities test suite", () => {

    let data;
    it.only("convertToInt tests", () => {

        data = Utilities.convertToInt(42);
        expect(data.success).toBeTruthy();
        expect(data.output).toBe(42);

        data = Utilities.convertToInt("42");
        expect(data.success).toBeTruthy();
        expect(data.output).toBe(42);

        data = Utilities.convertToInt("42.0");
        expect(data.success).toBeTruthy();
        expect(data.output).toBe(42);

        data = Utilities.convertToInt(" 1 ");
        expect(data.success).toBeTruthy();
        expect(data.output).toBe(1);

        data = Utilities.convertToInt("42.1");
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();

        data = Utilities.convertToInt("4e2a");
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();

        data = Utilities.convertToInt("1a");
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();

        data = Utilities.convertToInt(undefined);
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();

        data = Utilities.convertToInt(null);
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();

        data = Utilities.convertToInt(NaN);
        expect(data.success).toBeFalsy();
        expect(data.output).toBeNull();
    });
});