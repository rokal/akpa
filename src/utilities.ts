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
    export function convertToInt(value: any): {value:number | undefined, success: boolean}
    {
        if (isNaN(value)) {
            return {
                value: undefined,
                success:false};
        }
        else {
            let x = parseFloat(value);
            if ((x | 0) === x)
            {
                return {
                    value: (x | 0),
                    success: (x | 0) === x};
            }
            else {
                return {
                    value: undefined,
                    success: false};
            }
        }
    }        
}