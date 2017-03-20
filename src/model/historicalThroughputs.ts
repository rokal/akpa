/// <reference path="../../typings/globals/moment/index.d.ts" />

import * as moment from "moment";

export class HistoricalThroughputs {

    public get MinDate(){
        return this.minDate.toDate();
    }
    private minDate: moment.Moment;

    public get MaxDate():Date{
        return this.maxDate.toDate();
    }    
    private maxDate: moment.Moment;

    public get Items():Map{
        return this.elements;
    }
    private elements: Map;
    
    public get Count(): number{
        return this.elements.Count;
    }

    constructor(){
        this.elements = new Map();
        this.minDate = this.DEFAULT_MAX_DATE;
        this.maxDate = this.DEFAULT_MIN_DATE;
    }

    add(date:moment.Moment): void{

        let key = date.format(this.KEY_FORMAT);

        if (this.elements.has(key))
            this.elements.set(key, this.elements.get(key) + 1 );
        else
            this.elements.set(key, 1);

        if (date < this.minDate)
            this.minDate = date;
        
        if (date > this.maxDate)
            this.maxDate = date;
    }

    spread():Array<number>{

        let throughputs = new Array(0);
        if (this.minDate.isBefore(this.maxDate)){
            console.log("inside");
            let key: string;
            let currentDate = this.minDate;
            console.log("Start: " + currentDate.format(this.KEY_FORMAT));
            for (let i = 0; currentDate.isBefore(this.maxDate); i++, currentDate.add(1, "days")){
                key = currentDate.format(this.KEY_FORMAT);
                
                if (this.elements.has(key)){
                    console.log("PUSHING: " + this.elements.get(key));
                    throughputs.push(this.elements.get(key));
                    }
                else{
                    console.log("PUSHING: 0");
                    throughputs.push(0);
                }
            }
        }
        else if (this.Count == 1)
            throughputs.push(this.elements.get(this.minDate.format(this.KEY_FORMAT)));

        return throughputs;
    }

    private KEY_FORMAT = "YYYY-MM-DD";
    private DEFAULT_MAX_DATE = moment("01-01-2100", "MM-DD-YYYY");
    private DEFAULT_MIN_DATE = moment("01-01-1900", "MM-DD-YYYY");
}

    class Map {

        constructor() {
            this.counter = 0;
            this.items = {};
        }

        get Count():number{
            return this.counter;
        }
        private counter: number;

        private items: { [key: string]: number };

        set(key: string, value: number): void {
            if (!this.has(key))
                this.counter = this.counter + 1;

            this.items[key] = value;
        }

        has(key: string): boolean {
            return key in this.items;
        }

        get(key: string): number {
            return this.items[key];
        }
    }