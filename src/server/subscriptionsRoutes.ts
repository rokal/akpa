/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/stripe/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";

import {Database} from "./db";
import {Customer} from "./db";
import { Logger } from "./logger";
import { FileUploadInfo } from "./fileUploadInfo";
import * as winston from "winston";

export class SubscriptionsRoutes {

    private database:Database;

    constructor(database:Database) {
        this.router = Router();
        this.database = database;
    }

    public init(): Router {
        this.router.post("/", this.subscribeNewCustomer.bind(this));
        this.router.get("/:subscriptionId", this.getCustomer.bind(this));

        return this.router;
    }

    public subscribeNewCustomer(req: any, res: Response, next: NextFunction): void {

        winston.debug("%s:%s - Start call", req.method, req.originalUrl);

        let stripe = require("stripe")("sk_test_Mz5UQzJ17FCUtyjOIbYrgKNU");
        let customer = stripe.customers.create({
            email: req.fields.email,
            metadata:{
                firstname: req.fields.firstname,
                lastname: req.fields.lastname
            }},
            (err:any, customer:any) => {
                let facadeObject:any;
                if (err){
                    winston.error("Error on stripe.customers.create", err)
                    facadeObject = SubscriptionsRoutes.ERROR_CODE;
                }else{
                    let cust = new Customer(customer.metadata.firstname, customer.metadata.lastname, customer.email, customer.id);                
                    this.database.saveCustomer(cust);                
                    facadeObject = cust;
                }
                
                res.send({"customer":facadeObject});
                res.end();
                winston.debug("%s:%s - End call", req.method, req.originalUrl);                
            });
    }

    public getCustomer(req: Request, res: Response, next: NextFunction): void {

        winston.debug("%s:%s - Start call", req.method, req.originalUrl);

        let customer = this.database.getCustomer(req.params.subscriptionId);
        res.send({"customer":customer});
        res.end();
        
        winston.debug("%s:%s - End call", req.method, req.originalUrl);
    }

    static get RouteName(): string {
        return "/api/v1/subscriptions";
    }
    router: Router;

    private static ERROR_CODE = {"customer":undefined};
    private static TEST_SECRET_KEY = "sk_test_Mz5UQzJ17FCUtyjOIbYrgKNU";
    private static TEST_PUBLIC_KEY = "pk_test_6WGRz8Q65ruC4EOhAVOmw5NW";
}

// Stripe API Node references 
// https://stripe.com/docs/api#customer_object

// TESTS -> /api/v1/subscriptions
// curl -F email="bar@hotmail.com" -F firstname="Louis" -F lastname="Carignan" http://127.0.0.1:3030/api/v1/subscriptions
// curl -F email="gazou@outlook.com" -F firstname="Foo" -F lastname="Bar" http://127.0.0.1:3030/api/v1/subscriptions
// curl -F email="latte@gmail.com" -F firstname="Chocolate" -F lastname="Moka" http://127.0.0.1:3030/api/v1/subscriptions

// TESTS -> /api/v1/subscriptions/:subscriptionId
// curl http://127.0.0.1:3030/api/v1/subscriptions/Sbfx7l4Six90DT3
// curl -F id="ffASa1HhdctOzCd" http://127.0.0.1:3030/api/v1/subscriptions
// curl -F id="HOtNCpi4vinCNEL" http://127.0.0.1:3030/api/v1/subscriptions