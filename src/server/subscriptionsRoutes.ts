/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/stripe/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import {Stripe} from "stripe";
import { Router, Request, Response, NextFunction } from "express";

import { Logger } from "./logger";
import { FileUploadInfo } from "./fileUploadInfo";
import * as winston from "winston";

export class SubscriptionsRoutes {

    constructor() {
        this.router = Router();
    }

    public init(): Router {
        this.router.post("/", this.subscribeNewCustomer);
        this.router.get("/:subscriptionId", this.getCustomer);

        return this.router;
    }

    public subscribeNewCustomer(req: Request, res: Response, next: NextFunction): void {


        var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

        var customer = stripe.customers.create({
            email: "jenny.rosen@example.com",
        }, function (err, customer) {
            // asynchronously called
        });

    }

    public getCustomer(req: Request, res: Response, next: NextFunction): void {

    }

    static get RouteName(): string {
        return "/api/v1/subscriptions";
    }
    router: Router;

    private static TEST_SECRET_KEY = "sk_test_Mz5UQzJ17FCUtyjOIbYrgKNU";
    private static TEST_PUBLIC_KEY = "pk_test_6WGRz8Q65ruC4EOhAVOmw5NW";


}