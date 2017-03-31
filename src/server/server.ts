/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../typings/modules/body-parser/index.d.ts" />

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";

export class Server {
    config: any;
   
    private app: express.Application;

    constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    //this.config();
    this.app.get('/', (req, res) => {
      res.render('index');
    });
    
    this.app.listen(3030, () => {
    console.log(`App listening on port ${this.PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
    
  }


  private PORT = process.env.PORT || 8080;

}