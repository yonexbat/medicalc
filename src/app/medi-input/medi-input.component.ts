import {Component, OnInit } from '@angular/core';
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
  providers: [MediserviceService]
})
export class MediInputComponent implements OnInit {

  weight: number;
  dose: number;
  medisFound: Observable<MediData[]>;
  private mediSearchTearm = new Subject<string>();
  medi: MediData;
  mediName: string;


  constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {

      this.medisFound = this.mediSearchTearm
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.mediInputService.searchMediData(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<MediData[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<MediData[]>([]);
      });
  }

  // Push a search term into the observable stream.
  searchMedi(mediTerm: string): void {
    this.mediSearchTearm.next(mediTerm);
  }  

  selectMedi(medi: MediData)
  {
    this.medi = medi;
    this.mediName = medi.Name;
  }
}
