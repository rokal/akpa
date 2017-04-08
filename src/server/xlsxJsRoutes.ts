/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../typings/modules/formidable/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as formidable from "formidable";
import * as fs from "fs";
import * as path from "path";

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

            // let form = new formidable.IncomingForm();
            // form.parse(req, function (err, fields, files) {
            //     console.log("parsing");
            // });

            // form.on('file', function (name: any, file: any) {
            //     console.log(name);
            // });

            // form.on('error', function (err: any) {
            //     console.log('Error occurred during processing - ' + err);
            // });

            // // Invoked when all the fields have been processed.
            // form.on('end', function () {
            //     console.log('All the request fields have been processed.');
            // });        
        }

        return;
    }

    static get RouteName(): string {
        return FileUploadInfo.ROUTE_XLSJS;
    }

    router: Router;

}

