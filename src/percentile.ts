export class Percentile {
    value: number;
    constructor(percentile: number) {
        this.value = percentile;
    }        

    toString() : String {
        return (this.value * 100).toString() + "%";
    }
}
