/// <reference path="../../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../../node_modules/@types/node/index.d.ts" />

import {Router, Request, Response, NextFunction}  from "express";

export class JsZipRoutes {

	router: Router;

	constructor(){
		this.router = Router();
    	this.init();
// customerRouter.get('/', (request: express.Request, response: express.Response) => {
//     let testData = {
//         firstName: "The",
//         lastName: "Burge"
//     }

//     response.send(testData);
// });
	}

  init(): Router{
    this.router.get('/', this.getAll);
    return this.router;
  }	

public getAll(req: Request, res: Response, next: NextFunction) {
    res.json({
        message: 'Hello World!'
      });
  }	
}

