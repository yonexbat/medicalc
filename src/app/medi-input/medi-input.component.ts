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
import { NgForm, FormControl, AbstractControl } from '@angular/forms';        
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
  medi: MediData;
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
  }
 
  ngDoCheck() {
    //debugger;
  }

  onMediSelected(mediName: string)
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
        this.medisForMediNameArray.forEach(medi => {
          if(medi.Id == id)
          {
            this.medi = medi;
          }
        });

        this.mediInputService.getMedi(id).then(medi => {
          this.mediObservable.next(medi);
          this.medi = medi;                    
        }).catch(error => {
            alert(error);        
        });
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
    const form = this.currentForm.form;

    //Iterate over all fields
    for (const fieldName  in this.formFieldErrors) {
      
      //debugger;
      //Reset errormessage to empty string
      this.formFieldErrors[fieldName] = '';
      const control : AbstractControl = form.get(fieldName);
      if(control && control.dirty)
      {
      
         for (const key in control.errors) {
            switch(key)
            {
              case 'required':
                this.formFieldErrors[fieldName] += 'Feld ' + fieldName + ' ist ein Mussfeld'; 
                break;
            }           
         }        
      }
    }    
   
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
