export class MediData {

    Id: number;
    Name: string; 
    ActiveSubstance: string;
    Concentration: number;
    MinDose: number;
    MaxDose: number;

    constructor(Id: number, Name: string, 
        ActiveSubstance: string, Concentration: number, 
        MinDose: number, MaxDose: number)
    {
        this.Id = Id;
        this.Name = Name;
        this.ActiveSubstance = ActiveSubstance;
        this.Concentration = Concentration;
        this.MinDose = MinDose;
        this.MaxDose = MaxDose;

    }

}
