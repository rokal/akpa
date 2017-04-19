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

import { Logger } from "./logger";
import { XlsxJsRoutes } from "./xlsxJsRoutes"
import { RequestHandler, Request, Response, NextFunction } from "express";

export class Server {

    private app: express.Application;

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

        let uploadDir = path.join(__dirname, "uploads");

        this.app.use(this.middleCORSFunction);

        this.app.use(bodyParser.json({ limit: '500mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(ExpressFormidable({
            uploadDir: uploadDir,
            multiples: false
        }));


        winston.debug("ExpressJs server configured");
        winston.debug("   Uploads folder: %s", uploadDir);
    }

    private routes(): void {
        let router = express.Router();

        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.app.use("/", router);
        this.app.use(XlsxJsRoutes.RouteName, new XlsxJsRoutes().init());
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