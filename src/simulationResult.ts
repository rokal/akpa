export class SimulationResult {
    public get NumberOfItemsCompleted(): Number {
        return this._numberOfItemsCompleted;
    }
    private _numberOfItemsCompleted: Number;

    public get NumberOfDays(): Number {
        return this._numberOfDays;
    }
    private _numberOfDays: Number;

    public get Occurences(): number {
        return this._occurences;
    }
    private _occurences: number;

    constructor(numberOfItemsCompleted: Number, numberOfDays: Number) {
        this._numberOfItemsCompleted = numberOfItemsCompleted;
        this._numberOfDays = numberOfDays;
        this._occurences = 1;
    }

    incrementOccurences() {
        this._occurences = this._occurences + 1;
    }

    toString() {
        return this._numberOfItemsCompleted +
            " items delivered in " +
            this._numberOfDays + 
            " days [" +
            this._occurences +
            " occurences]";
    }
}