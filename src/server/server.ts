/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../typings/modules/body-parser/index.d.ts" />
/// <reference path="../../typings/modules/express-formidable/index.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
const ExpressFormidable = require("express-formidable");
import * as path from "path";

import { XlsxJsRoutes } from "./xlsxJsRoutes"
import {RequestHandler, Request, Response, NextFunction}  from "express";

export class Server {
   
    private app: express.Application;

    constructor() {

    //create expressjs application
    this.app = express();
    
    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();

    this.app.listen(this.PORT, () => {
      console.log(`App listening on port ${this.PORT}`);
      console.log('Press Ctrl+C to quit.');
    });    
  }

  private config():void{

    this.app.use(this.middleCORSFunction);

    this.app.use(bodyParser.json({limit: '500mb'}));
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(ExpressFormidable({
      uploadDir: path.join(__dirname, "uploads"),
      multiples: false
    }));
  }

  private routes():void{
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

  private api():void{

  }

  private middleCORSFunction(req: Request, res: Response, next: NextFunction): any{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }

  private PORT = process.env.PORT || 3030;

}
new Server();