/// <reference path="../typings/globals/jest/index.d.ts" />

import {ExcelImportResult} from "../src/model/io/excelImportResult";
import {SimulationController} from "../src/model/simulationController";


describe("SimulationController test suite", () => {

    let expectedStartDate = new Date(2017, 0, 1);
    let expectedEndDate = new Date(2017, 0, 26);
    let expectedRowIndex = 2;

    let expectedResults = [
        new ExcelImportResult(expectedStartDate, expectedEndDate, expectedRowIndex, []),
        new ExcelImportResult(expectedEndDate, expectedStartDate, expectedRowIndex, []),
        new ExcelImportResult(expectedStartDate, expectedEndDate, expectedRowIndex, ["foo", "bar"]),
    ];

    let simController:SimulationController;

    beforeEach(() => {
         simController = new SimulationController();
    })    

    test("Constructor test", () => {

        expect(simController.NumberOfDays).toEqual(25);
        expect(simController.StartDate.getFullYear()).toEqual(1900);
        expect(simController.StartDate.getMonth()).toEqual(0);
        expect(simController.StartDate.getDate()).toEqual(1);
    })

    test("buildValidDates test with no results", () => {

        simController.buildValidDates(new Array<ExcelImportResult>(0));

        expect(simController.getImportErrors()).not.toBeNull();
        expect(simController.getImportErrors().length).toEqual(0);
    })

    test("buildValidDates test with 3 ExcelImportResult objects", () => {

        simController.buildValidDates(expectedResults);

        expect(simController.getImportErrors()).not.toBeNull();
        expect(simController.getImportErrors().length).toEqual(1);
    }) 

    test("buildThroughputs tests", () => {

        // This whole test is ugly. I can't verify is the function 
        // buildThroughputs() did its job correctly
        simController.buildValidDates(new Array<ExcelImportResult>(0));
        simController.buildThroughputs();

        simController.buildValidDates(expectedResults);
        simController.buildThroughputs();
    })

    
})