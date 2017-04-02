/// <reference path="../../node_modules/@types/express/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../typings/modules/formidable/index.d.ts" />

import { Router, Request, Response, NextFunction } from "express";
import * as formidable from "formidable";
import * as fs from "fs";
import * as path from "path";
import { FileUploadInfo } from "./fileUploadInfo";

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

        //Formidable uploads to operating systems tmp dir by default
        // var form = new formidable.IncomingForm();
        // form.uploadDir = path.join(__dirname, "/uploads");       //set upload directory
        // form.keepExtensions = true;     //keep file extension
        // form.multiples = true;

        let xlsFile = req.files[FileUploadInfo.FIELD_FILE];                
        if (!xlsFile) {

            xlsFile = req.fields.myfile
            if (!xlsFile){
                console.log("not working");
                res.end();    
                return;            
            }
            // console.log("decodeExcelFile");
            // let full = path.join(__dirname, "/uploads/", myFile.name);
            // fs.rename(myFile.path, full, function (err) {
            //     if (err)
            //         throw err;
            //     console.log('renamed complete');
            // });
        }

        console.log("Got something");
        
        res.end();      
        return;
    }

    private importFile(filename:string):void{
        console.log("Going to import Excel");
    }

    static get RouteName(): string {
        return FileUploadInfo.ROUTE_XLSJS;
    }

    router: Router;
    
}

