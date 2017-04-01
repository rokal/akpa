/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import {Router, Request, Response, NextFunction}  from "express";

export class XlsxJsRoutes {

	router: Router;

	constructor(){
		  this.router = Router();
	}

  init(): Router{
    this.router.get('/', this.getAll);
    this.router.post('/', this.decodeExcelFile);
    return this.router;
  }	

public getAll(req: Request, res: Response, next: NextFunction): void {
    console.log("getAll!");
    res.json({
        message: 'getAllGAZOU'
      });
  }	

  public decodeExcelFile(req: Request, res: Response, next: NextFunction):void {
    console.log("decodeExcelFile");
        res.json({
        message: 'decodeExcelFile'
      });
  }
}

