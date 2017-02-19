import { Injectable } from '@angular/core';
import {MediData} from './medi-data';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MediserviceService {

  constructor() { } 

  public getMediData(): Observable<MediData[]> {
    let result = this.getMediDataInternal();
    return Observable.of(result);
  }

  public searchMediData(searchtearm: string) : Observable<MediData[]> 
  {
    let allData = this.getMediDataInternal();
    let result = [];   
    allData.forEach(element => {
      let searchTearmUpperCase = searchtearm.toUpperCase();
      let mediNameUpperCase = element.Name.toUpperCase();

      if(mediNameUpperCase.includes(searchTearmUpperCase))
      {
        result.push(element);
      }
    });
    return Observable.of(result);
  }

  private getMediDataInternal(): MediData[] {
    let result = [
      new MediData(3, 'Fenta'),
      new MediData(4, 'Cocaine'),
    ];

    return result;
  }

}
