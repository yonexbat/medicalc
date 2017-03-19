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
  medi: MediData;
  mediName: string;
  medisForMediName: Observable<MediData[]>;   
  mediIdToMediMap: { [key:number]: MediData; } = {};
  mediNameSubject = new Subject<string>(); 

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

    //When data for medi name arrives.  
    this.medisForMediName.subscribe(medis => {
      this.mediIdToMediMap = { } 
      medis.forEach(medi => {
        this.mediIdToMediMap[medi.Id] = medi;
      });

      if(medis && medis.length === 1)
      {
        this.medi = medis[0];
      }
      else {
        this.medi = null;
      }

    });     
  
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
        this.medi = this.mediIdToMediMap[id];         
    }
    else {
      this.medi = null;
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
     
  }

 quantity() : number {
    if(this.medi != null && this.dose && this.dose != 0)
    {
      let con = this.medi.Concentration;
      return this.dose*this.weight*1/con;  
    }
    return null;
  }

}
