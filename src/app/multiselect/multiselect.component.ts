import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
  providers: [MediserviceService],
})
export class MultiselectComponent implements OnInit {

  medisFound: Observable<string[]>;
  private mediSearchTearm = new Subject<string>();
  mediName: string;

  @Output() onMediSelected = new EventEmitter<string>();

  constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {

    this.medisFound = this.mediSearchTearm
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.mediInputService.searchMediData(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<string[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<string[]>([]);
      });

    this.medisFound.subscribe(mediList =>  {
        this.medisFoundChanged(mediList);          
    });

  }

  medisFoundChanged(mediList: string[])
  {
    if(mediList.length == 1)
    {
      let medi = mediList[0];
      this.selectMedi(medi);
    }
  }

    // Push a search term into the observable stream.
  searchMedi(mediTerm: string): void {
    this.mediSearchTearm.next(mediTerm);
  }  

  selectMedi(medi: string)
  {
    this.mediName = medi;
    this.mediSearchTearm.next('');
    this.onMediSelected.emit(medi);
  }

}
