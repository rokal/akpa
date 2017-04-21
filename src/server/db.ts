/// <reference path="../../typings/globals/lokijs/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import * as fs from "fs";
import * as loki from "lokijs";
import * as winston from "winston";

export class Database {

    private dbHandle: Loki;

    constructor() {
        this.dbHandle = new loki(Database.DATABASE_NAME);
    }

    public saveCustomer(customer: Customer): void {

        let customers = this.getCustomersCollection();

        (<any>customer)["id"] = this.makeId();
        let t = customers.insert(customer);
     
        this.dbHandle.close();
    }

    public getCustomer(id:string):Customer | undefined{
        let customers = this.getCustomersCollection();

        let results = customers.chain().find({"id":id}).data();
        if (results.length == 1)
            return (<Customer>results[0]);
        else
            return undefined;
    }

    private getCustomersCollection():LokiCollection<{}>{
        let customers = this.dbHandle.getCollection(Database.COLL_CUSTOMER);
        if (customers == undefined)
            customers = this.dbHandle.addCollection(Database.COLL_CUSTOMER);

        return customers;
    }

    private makeId(): string {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    private static COLL_CUSTOMER = "customers";
    private static DATABASE_NAME = "databse.json";
}

export class Customer {
    
    constructor(readonly firstName: string,
        readonly lastName: string,
        readonly email: string,
        readonly stripeId: string)
    { }
}