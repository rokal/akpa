/// <reference path="../typings/globals/jest/index.d.ts" />

import {Customer} from "../src/server/db";
import {Database} from "../src/server/db";

describe("Database test suite", () => {

    test("Save customer", () => {
        let customer = new Customer("sdfsdf", 
                                    "dfsd",
                                    "toto@gmail.com",
                                    "sddsd");

        let db = new Database();

        db.saveCustomer(customer);

        let id = (<any>customer)["id"];
        expect(id).not.toBeNull();
    })

    test("Get valid customer", () => {
        let expectedCustomer = new Customer("sdfsdf", 
                                    "dfsd",
                                    "toto@gmail.com",
                                    "sddsd");

        let db = new Database();
        db.saveCustomer(expectedCustomer);
        let id = (<any>expectedCustomer)["id"];
        expect(id).not.toBeNull();

        let actualCustomer = db.getCustomer(id);
        expect(actualCustomer).not.toBeNull();
        expect(actualCustomer).toEqual(expectedCustomer);
    })
})