export class SimulationResult {

    public get Occurences(): number {
        return this.occurences;
    }
    private occurences: number;

    constructor(public readonly NumberOfItemsCompleted: number, 
                public readonly NumberOfDays: number) {
        this.occurences = 1;
    }

    incrementOccurences():void {
        this.occurences = this.occurences + 1;
    }

    toString():string {
        return `${this.NumberOfItemsCompleted} items delivered in 
                ${this.NumberOfDays} days [${this.occurences} occurences]`;
    }
}