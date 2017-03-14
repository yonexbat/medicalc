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
  AfterViewChecked } from '@angular/core';
import { NgForm, FormControl, AbstractControl } from '@angular/forms';        
import {MediserviceService} from './../mediservice.service';
import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
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
  mediName: string;
  medisForMediName: Observable<MediData[]>;  
  private mediNameSubject = new Subject<string>(); 

  formFieldErrors = {
    'weight': '',
    'dose': ''
  };

  @ViewChild('inputForm') currentForm: NgForm;
  formSubscribed: boolean = false;
  
 constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {      
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
  }
 
  ngDoCheck() {
    //debugger;
  }

  onMediSelected(mediName: string)
  {
    this.mediName = mediName;
    this.mediNameSubject.next(mediName);
    
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
    if(this.medi != null )
    {
      return this.dose*this.weight*this.medi.Concentration;  
    }
    return null;
  }

}
