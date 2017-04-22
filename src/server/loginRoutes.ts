/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as path from "path";

import {Database} from "./database";
import * as winston from "winston";

export class LoginRoutes {

    private database:Database;

    private staticDir:string;

    constructor(database:Database, staticDir:string){
        this.router = Router();
        this.database = database;
        this.staticDir = staticDir;
    }

    public init(): Router {
        this.router.get("/:id", this.login.bind(this));
        return this.router;
    }

    public login(req: Request, res: Response, next: NextFunction): void {

        winston.debug("%s:%s - Start call", req.method, req.originalUrl);

        let customer = this.database.getCustomer(req.params.subscriptionId);
        if (customer.email){
            res.sendFile(path.join(this.staticDir, "index.html"));
        }   
        else{
            res.sendFile(path.join(this.staticDir, "subscription.html"));
        }
        
        winston.debug("%s:%s - End call", req.method, req.originalUrl);
    }

    static get RouteName(): string {
        return "/";
    }
    router: Router;
}