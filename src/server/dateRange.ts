export class DateRange{

    constructor(public readonly StartDate:Date,
                public readonly EndDate:Date){
    }

    toString(): string{
        return `Start: ${this.StartDate} End: ${this.EndDate}`;
    }
}