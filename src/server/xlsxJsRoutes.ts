/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/winston/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";

import { FileUploadInfo } from "./fileUploadInfo";
import { XlsxConverter } from "./xlsxConverter";
import * as winston from "winston";

export class XlsxJsRoutes {

    constructor() {
        this.router = Router();
    }

    public init(): Router {
        this.router.get("/", this.getAll);
        this.router.post("/", this.decodeExcelFile);

        return this.router;
    }

    public getAll(req: Request, res: Response, next: NextFunction): void {
        winston.debug("getAll");
        res.json({message: "getAll"});
    }

    public decodeExcelFile(req: any, res: Response, next: NextFunction): void {
        
        let xlsFile = req.files[FileUploadInfo.FIELD_FILE];
        if (xlsFile) {            
            let converter = new XlsxConverter();

            winston.debug("Got File: %s", xlsFile.path);            
            let json = converter.getJson(xlsFile.path);
            res.send(json).end();            
            winston.debug("File %s sent back to %s", xlsFile.path, req.connection.remoteAddress);
            
            fs.unlink(xlsFile.path, function(err: NodeJS.ErrnoException){
                if (err)
                    winston.error(err.message);
            });
            winston.debug("File %s deleted", xlsFile.path);
        }
        else {
            winston.debug("No field %s in request", FileUploadInfo.FIELD_FILE);
        }

        return;
    }

    static get RouteName(): string {
        return FileUploadInfo.ROUTE_XLSJS;
    }

    router: Router;
}

// curl -F xlsFile=@"./tests/data/Analytics-data.xls" http://54.227.206.200:80/api/v1/xlsxjs
// curl -F xlsFile=@"./tests/data/Analytics-data.xls" http://localhost:3030/api/v1/xlsxjs
// curl -F xlsFile=@"./tests/data/Excel_2007_Xlsx_TestSheet.xlsx" http://localhost:3030/api/v1/xlsxjs 