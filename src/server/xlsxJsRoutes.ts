/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../typings/modules/formidable/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as formidable from "formidable";
import * as fs from "fs";
import * as path from "path";

import { FileUploadInfo } from "./fileUploadInfo";
import { ExcelImporter } from "./excelImporter";
import { log } from "util";

export class XlsxJsRoutes {

    constructor() {
        this.router = Router();
    }

    public init(): Router {
        this.router.get('/', this.getAll);
        this.router.post('/', this.decodeExcelFile);

        let form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, 'uploads');

        return this.router;
    }

    public getAll(req: Request, res: Response, next: NextFunction): void {
        console.log("getAll!");
        res.json({
            message: 'getAllGAZOU'
        });
    }

    public decodeExcelFile(req: any, res: Response, next: NextFunction): void {

        let excelImporter = new ExcelImporter("");
        let xlsFile = req.files[FileUploadInfo.FIELD_FILE];
        if (xlsFile) {            
            excelImporter.loadFile(xlsFile.path);
            console.log("Got File");
            let t = excelImporter.getJson();
            res.send(t).end();

            fs.unlink(xlsFile.path, function(err: NodeJS.ErrnoException){
                if (err)
                    log(err.message);
            });
        }
        else if (req.fields.xlsFile) {            
            xlsFile = req.fields.xlsFile;
            //excelImporter.loadBlob(xlsFile);            
            console.log("Got BLOB");
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

