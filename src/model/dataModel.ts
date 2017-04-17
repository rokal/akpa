import {DateValidator} from "./dateValidator";
import {ExcelImportResult} from "./ExcelImportResult";

export class DataModel {

    private jsonModel: Array<DataItem>
    
    private headers:DataItem;
    private titles: Array<string>;
    private translationMap: StringArray;

    constructor(data:string) {
        this.jsonModel = JSON.parse(data, this.transform);
        this.titles = new Array<string>(0);
        this.translationMap = {};

        if (!this.modelIsEmpty()) {

            this.headers = this.jsonModel[0];            
            
            for (let columnIndex in this.headers.Items){                
                let title = this.headers.Items[columnIndex];
                this.titles.push(title);

                this.translationMap[title] = columnIndex;
            }
        }
    }

    getTitles(): Array<string> {
        return this.titles;
    }

    createResults(startColumnName:string, endColumnName:string):Array<ExcelImportResult>{

        let results = new Array<ExcelImportResult>();
        let dataItem:DataItem;
        let result:ExcelImportResult;

        let start = this.translationMap[startColumnName];
        let end = this.translationMap[endColumnName];
        for (let i = 1; i < this.jsonModel.length; i++){
            dataItem = this.jsonModel[i];
            
            result = DateValidator.process(startColumnName, 
                                            dataItem.Items[start],
                                            endColumnName,
                                            dataItem.Items[end],
                                            i)
            results.push(result);
        }

        return results;
    }

    private modelIsEmpty(): boolean {
        if (this.jsonModel == undefined ||
            this.jsonModel.length == 0)
            return true;
        else
            return false;
    }

    private transform(key:string, value:any):any{

        if (typeof(value) == "string")
            // We are on an element of an item
            return value;
        else if (value instanceof Array)
            // We are at the root of our JSON. We should have an array of all
            // the objects
            return value;
        else if (typeof(value) == "object")
            // We are on an item of the JSON. Create a DataItem object
            return new DataItem(value);
    }

}
    interface StringArray {
        [index: string]: string;
    }

    class DataItem{
        constructor(obj:Object) {
            this.counter = 0;
            this.items = {};

            for (let t in obj){
                let val = (obj as any)[t];
                this.items[t] = val;
                //this.set(t, val as string);
                this.counter = this.counter + 1;
            }            
        }

        get Count():number{
            return this.counter;
        }
        private counter: number;

        public get Items():StringArray{
            return this.items;
        }
        items:StringArray;

        set(key: string, value: string): void {
            if (!this.has(key))
                this.counter = this.counter + 1;

            this.items[key] = value;
        }

        has(key: string): boolean {
            return key in this.items;
        }

        get(key: string): string {
            return this.items[key];
        }        
    }
