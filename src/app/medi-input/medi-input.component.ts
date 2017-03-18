import {
  Input, 
  Component, 
  OnInit, 
  OnChanges, 
  SimpleChanges, 
  SimpleChange,
  ChangeDetectionStrategy, 
  DoCheck, 
  ViewChild,
  AfterViewChecked,
  ApplicationRef } from '@angular/core';
import { NgForm, FormControl, AbstractControl, FormGroup } from '@angular/forms';        
import {MediserviceService} from './../mediservice.service';
import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MediData} from '../medi-data';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-medi-input',
  templateUrl: './medi-input.component.html',
  styleUrls: ['./medi-input.component.css'],
  providers: [MediserviceService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediInputComponent implements OnInit, DoCheck, AfterViewChecked { 

  weight: number;
  dose: number;
  mediObservable = new BehaviorSubject<MediData>(null);
  mediName: string;
  medisForMediName: Observable<MediData[]>;     
  medisForMediNameArray: MediData[];

  private mediNameSubject = new Subject<string>(); 

  formFieldErrors = {
    'weight': '',
    'dose': ''
  };

  @ViewChild('inputForm') currentForm: NgForm;
  formSubscribed: boolean = false;
  
 constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {   

    //When new agent is selected.   
    this.medisForMediName = this.mediNameSubject
      .switchMap(mediName => {
          if(mediName)
          {
            return this.mediInputService.getMedisForMediName(mediName);
          }
          return Observable.of<MediData[]>([]);
      })
      .catch(error => {
        console.log(error);
        return Observable.of<MediData[]>([]);
      });

    //When Medis for agent arrive  
    this.medisForMediName.subscribe(medis => {

      this.medisForMediNameArray = medis;

      if(medis && medis.length === 1)
      {
        this.mediObservable.next(medis[0]); 
      }
      else {
        this.mediObservable.next(null);
      }

    });     

    this.mediObservable.subscribe(medi => {
      this.onRealMediSelected(medi);
    });
  }


  private onRealMediSelected(medi: MediData)
  {
      let doseControl : AbstractControl = this.currentForm.form.get("dose");
      if(doseControl != null)
      {
        doseControl.updateValueAndValidity();
      }
  }
 
  ngDoCheck() {
    //debugger;
  }

  onMediNameSelected(mediName: string)
  {
    this.mediName = mediName;
    this.mediNameSubject.next(mediName);    
  }

  onMediIdSelected(eventArgs)
  {
    let id : number;
    id = eventArgs.target.value;
    if(id > 0)
    {       
        this.mediInputService.getMedi(id).then(medi => {
          this.mediObservable.next(medi);                 
        }).catch(error => {
            alert(error);        
        });
    }
    else {
      this.mediObservable.next(null);
    }
  }

  ngAfterViewChecked() {
    if(!this.formSubscribed && this.currentForm)
    {
      this.subscribeForm();
    }
  }

  subscribeForm(){
    this.formSubscribed = true;
    this.currentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    
    if (!this.currentForm) { 
      return; 
    }
    this.validate();     
  }

  validate() {
    const form : FormGroup  = this.currentForm.form; 
    let  currentMedi : MediData = this.mediObservable.getValue();

    //Validate Gewicht
    const weightControl : AbstractControl = form.get("weight");
    this.formFieldErrors["weight"] = null;
    if(weightControl && weightControl.dirty && weightControl.errors && weightControl.errors["required"])
    {
      this.formFieldErrors["weight"] = "Gewicht ist ein Mussfeld";  
    }

    //Validate Dose
    let doseControl = form.get("dose");
    this.formFieldErrors["dose"] = null;
    if(doseControl && doseControl.dirty)
    {
      let doseValue : Number = doseControl.value;
      if(!(doseValue > 0))
      {
          this.formFieldErrors["dose"] = `Gewünschte Dosierung ist ein Mussfeld`;
      } else if(currentMedi)
      {
          if(doseValue < currentMedi.MinDose)
          {
            this.formFieldErrors["dose"] = `Gewünschte Dosierung muss grösser als ${currentMedi.MinDose} sein`; 
          }
          if(doseValue > currentMedi.MaxDose
          )
          {
            this.formFieldErrors["dose"] = `Gewünschte Dosierung muss kleiner als ${currentMedi.MaxDose} sein`; 
          }
      }
   }
      /*
    let doseControl = form.get("dose");
    this.formFieldErrors["dose"] = null;
    if(currentMedi && doseControl && doseControl.dirty && doseControl.hasError("tooSmall"))
    {
      this.formFieldErrors["dose"] = `Gewünschte Dosierung muss grösser als ${currentMedi.MinDose} sein`; 
    }
    if(currentMedi && doseControl && doseControl.dirty && doseControl.hasError("tooBig"))
    {
      this.formFieldErrors["dose"] = `Gewünschte Dosierung muss kleiner als ${currentMedi.MaxDose} sein`;  
    }   */    
  }

    


  quantity() : number {
    if(this.mediObservable.getValue() != null && this.dose && this.dose != 0)
    {
      let con = this.mediObservable.getValue().Concentration;
      return this.dose*this.weight*1/con;  
    }
    return null;
  }

}
