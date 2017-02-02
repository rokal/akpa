export class Percentile {
    value: number;
    constructor(percentile: number) {
        if (percentile < 0)
            throw new RangeError("Percentile cannot be negative (" + percentile + ")");
        
        if (percentile > 1)
            throw new RangeError("Percentile cannot be greater than 1. Percentile operates between 0 and 1");
        this.value = percentile;
    }        

    toString() : String {
        return (this.value * 100).toString() + "%";
    }
}
