import {Input, Component, OnInit, OnChanges, 
        SimpleChanges, SimpleChange,ChangeDetectionStrategy, DoCheck } from '@angular/core';
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
export class MediInputComponent implements OnInit, DoCheck {


  weight: number;
  dose: number;
  medi: MediData;
  
  


  constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {      

  }
 
  ngDoCheck() {
    //debugger;
  }

  onMediSelected(medi: MediData)
  {
    this.medi = medi;
    debugger;
  }

  quantity() : number {
    return this.dose*this.weight;  
  }

}
