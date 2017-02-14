import { DateRange } from "./dateRange";
import * as moment from "moment";

export class ThroughputBuilder {

    private static elements: Map;

    private constructor() {        
    }

    static build(dates: Array<DateRange>): Array<number> {

        this.elements = new Map();
        let key:string;
        let startMoment = moment();
        let endMoment = moment();

        for (let range of dates) {
            startMoment = moment(range.StartDate);
            endMoment = moment(range.EndDate);

            // If the end date is greater than the start date (up to the second)
            // skip this date range value as it is incorrect.
            if (endMoment.isBefore(startMoment, "second"))
                continue;

            key = endMoment.format("YYYY-MM-DD");
            if (this.elements.has(key))
                this.elements.set(key, this.elements.get(key) + 1 );
            else
                this.elements.set(key, 1);                
        }

        return this.elements.toArray();
    }
}

class Map {
        private items: { [key: string]: number };

        constructor() {
            this.items = {};
        }

        set(key: string, value: number): void {
            this.items[key] = value;
        }

        has(key: string): boolean {
            return key in this.items;
        }

        get(key: string): number {
            return this.items[key];
        }

        toArray(): Array<number>{
            let numbers = Array<number>(0);

            for (let key in this.items)
                numbers.push(this.items[key]);

            return numbers;
        }
    }
