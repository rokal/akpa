/// <reference path="../../node_modules/@types/winston/index.d.ts" />

//require('winston-daily-rotate-file');
import * as winston from "winston";

export class Logger {

    // Log levels are defined here
    // https://github.com/winstonjs/winston#logging-levels

    static Error = "error";

    static Warn = "warn";

    static Info = "info";

    static Verbose = "debug";

    static configure(): void {

        let level = process.env.ENV === 'development' ? 'debug' : 'info';
    // let t = new winston.transports.DailyRotateFile({
    //                 filename: './log',
    //                 datePattern: 'yyyy-MM-dd.',
    //                 prepend: true,
    //                 level: process.env.ENV === 'development' ? 'debug' : 'info'
    //             });

        winston.configure({
            transports: [
                new winston.transports.Console({
                    timestamp: (new Date()).toLocaleTimeString(),
                    colorize: true,
                    level: level
                })
                
            ]
        });

        // The logging level can be set by the 
        // $ node -e 'process.env.ENV = "development"'

        winston.info("------------------");
        winston.info("Winston configured");
        winston.info(" Level: %s", level);
        winston.info("------------------");
    }
}