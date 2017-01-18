export module Utilities{

    /**
     * Returns a random integer between minValue (inclusive) 
     * and max (inclusive). 
     */
    export function generateHistoricalThroughput(
                    minValue:number,
                    maxValue:number, 
                    sample:number): Array<number>
    {
        let data = new Array<number>(sample);
        for (let i = 0; i < sample; i++)
        {
            data[i] = Math.floor((Math.random() * (maxValue - minValue + 1)) + minValue);
        }

        return data;
    }

    /**
     * Returns 
     */
    export function convertToInt(value: any, output:number | null): boolean
    {
        if (isNaN(value)) {
            output = null;
            return false;
        }
        else {
            let x = parseFloat(value);
            if ((x | 0) === x)
            {
                output = (x | 0);
                return (x | 0) === x;
            }
            else {
                output = null;
                return false;
            }
        }
    }        
}