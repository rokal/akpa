export class SimulationResult {
    public get NumberOfItemsCompleted(): number {
        return this._numberOfItemsCompleted;
    }
    private _numberOfItemsCompleted: number;

    public get NumberOfDays(): number {
        return this._numberOfDays;
    }
    private _numberOfDays: number;

    public get Occurences(): number {
        return this._occurences;
    }
    private _occurences: number;

    constructor(numberOfItemsCompleted: number, numberOfDays: number) {
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