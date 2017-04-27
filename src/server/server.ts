/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />
/// <reference path="../../typings/modules/body-parser/index.d.ts" />
/// <reference path="../../typings/modules/express-formidable/index.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
const ExpressFormidable = require("express-formidable");
import * as winston from "winston";
import * as path from "path";

import { Database} from "./database";
import { Logger } from "./logger";
import { SubscriptionsRoutes } from "./subscriptionsRoutes"
import { XlsxJsRoutes } from "./xlsxJsRoutes"
import {LoginRoutes} from "./loginRoutes";
import { RequestHandler, Request, Response, NextFunction } from "express";

export class Server {

    private app: express.Application;

    private database:Database;

    private uploadDir:string;
    private staticDir:string;

    constructor() {

        Logger.configure();

        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();

        this.app.listen(this.PORT, () => {
            winston.info("App listening on port %s", this.PORT);
            winston.info("Press Ctrl+C to quit.");
        });
    }

    private config(): void {
        this.uploadDir = path.join(__dirname, "uploads");
        this.staticDir = path.join(__dirname, "../static")

        this.app.use(this.middleCORSFunction);

        this.app.use('/static', express.static(this.staticDir))        
        //this.app.use(bodyParser.json({ limit: '500mb' }));
        //this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(ExpressFormidable({
            uploadDir: this.uploadDir,
            multiples: false
        }));

        this.database = new Database();

        winston.debug("ExpressJs server configured");
        winston.debug("   Uploads folder.: %s", this.uploadDir);
        winston.debug("   Static folder..: %s", this.staticDir);    
    }

    private routes(): void {
        this.app.use(LoginRoutes.RouteName, new LoginRoutes(this.database, this.staticDir).init());        
        this.app.use(SubscriptionsRoutes.RouteName, new SubscriptionsRoutes(this.database, this.staticDir).init());
        this.app.use(XlsxJsRoutes.RouteName, new XlsxJsRoutes(this.uploadDir).init());
    }

    private api(): void {
    }

    private middleCORSFunction(req: Request, res: Response, next: NextFunction): any {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }

    private PORT = process.env.PORT || 3030;
}
new Server();