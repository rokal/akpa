export class DataModel {

    private jsonModel: Array<DataItem>
    
    private headers:DataItem;
    private titles: Array<string>;

    constructor(data:string) {
        this.jsonModel = JSON.parse(data, this.transform);
        this.titles = new Array<string>(0);

        if (!this.modelIsEmpty()) {

            this.headers = this.jsonModel[0];            
            
            for (let title in this.headers.Items){                
                let val = this.headers.Items[title];
                this.titles.push(title);

            }
        }
    }

    getTitles(): Array<string> {
        return this.titles;
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
