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
     * Converts a value to an integer. It returns this value with a
     * success flag. Check the 'success' flag first before working
     * with the returned value. 
     */
    export function convertToInt(value: any): {value:number | undefined, isInteger: boolean}
    {
        if (isNaN(value)) {
            return {
                value: undefined,
                isInteger:false};
        }
        else {
            let x = parseFloat(value);
            if ((x | 0) === x)
            {
                return {
                    value: (x | 0),
                    isInteger: (x | 0) === x};
            }
            else {
                return {
                    value: undefined,
                    isInteger: false};
            }
        }
    }

    export function validateInRange(
                    lowerLimit:number, 
                    minValue:number, 
                    valueToCheck:number, 
                    maxValue:number,
                    higherLimit:number) : 
        {isInRange: boolean,
         errorMessage: String}    
    {
        let data = {isInRange: false, errorMessage: ""};
       
        if (valueToCheck < lowerLimit)
            data.errorMessage = "Please enter a value greater or equal to " + lowerLimit;    
        else if (valueToCheck < minValue){
            data.errorMessage = "Please enter a value greater or equal to " + minValue;    
        } else if (valueToCheck > maxValue){
            data.errorMessage = "Please enter a value smaller than " + maxValue;    
        } else if (valueToCheck > higherLimit){
            data.errorMessage = "Please enter a value smaller than " + higherLimit;    
        } else
        {
            data.isInRange = true;
            data.errorMessage = "";
        }
        
        return data;
    }
}