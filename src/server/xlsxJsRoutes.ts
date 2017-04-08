/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";

import { FileUploadInfo } from "./fileUploadInfo";
import { XlsxConverter } from "./xlsxConverter";
import { log } from "util";

export class XlsxJsRoutes {

    constructor() {
        this.router = Router();
    }

    public init(): Router {
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

    public decodeExcelFile(req: any, res: Response, next: NextFunction): void {
        
        let xlsFile = req.files[FileUploadInfo.FIELD_FILE];
        if (xlsFile) {            
            let converter = new XlsxConverter();
            console.log("Got File: " + xlsFile.path);
            let t = converter.getJson(xlsFile.path);
            res.send(t).end();
            console.log("File sent");
            fs.unlink(xlsFile.path, function(err: NodeJS.ErrnoException){
                if (err)
                    console.log(err.message);
            });
            console.log("File deleted");
        }
        else {
        }

        return;
    }

    static get RouteName(): string {
        return FileUploadInfo.ROUTE_XLSJS;
    }

    router: Router;
}

