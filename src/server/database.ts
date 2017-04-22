/// <reference path="../../typings/globals/lokijs/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import * as loki from "lokijs";
import * as winston from "winston";

import * as path from "path";
import * as fs from "fs";

export class Database {

    private dbHandle: Loki;
    private databaseDir: string

    constructor() {

        var databaseDir = path.join(__dirname, "/database");
        if (!fs.existsSync(databaseDir))
            fs.mkdirSync(databaseDir);

        databaseDir = path.join(databaseDir, Database.DATABASE_NAME);

        this.dbHandle = new loki(databaseDir,
            {
                autosave: false,
                autoload: false,
                autosaveInterval: 5000,                
                verbose:true
            });
        this.dbHandle.loadDatabase({}, function(err:any, data:any){            
            winston.info("Database started [File %s]", databaseDir)
        });
        this.databaseDir = databaseDir;
    }

    public saveCustomer(customer: Customer){
    
        let customers = this.getCustomersCollection();

        (<any>customer)["id"] = this.makeId();
        customers.insert(customer);

        winston.debug("Inserted: Customer %j", JSON.stringify(customer));
        
        this.dbHandle.saveDatabase((err:any) =>{
            if (err)
                winston.error("Error saving customer: %j", err);
        });
    }

    public getCustomer(id: string): Customer {

        let customers = this.getCustomersCollection();

        let results = customers.chain().find({ "id": id }).data();
        let customer: Customer;
        if (results.length == 1)
            customer = (<Customer>results[0]);
        else
            customer = Customer.EmptyCustomer;

        return customer;
    }

    private getCustomersCollection(): LokiCollection<{}> {
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
    private static DATABASE_NAME = "database.json";
}

export class Customer {

    public static EmptyCustomer = new Customer("", "", "", "");

    constructor(readonly firstName: string,
        readonly lastName: string,
        readonly email: string,
        readonly stripeId: string)
    { }
}