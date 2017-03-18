export class MediData {

    Id: number;
    Name: string; 
    Concentration: number;
    MinDose: number;
    MaxDose: number;
    Unit: string;
    DenominatorUnit: string;

    constructor(
        Id: number, 
        Name: string, 
        Concentration: number, 
        MinDose: number, 
        MaxDose: number,
        Unit: string,
        DenominatorUnit: string)
    {
        this.Id = Id;
        this.Name = Name;
        this.Concentration = Concentration;
        this.MinDose = MinDose;
        this.MaxDose = MaxDose;
        this.Unit = Unit;
        this.DenominatorUnit = DenominatorUnit;
    }
}
