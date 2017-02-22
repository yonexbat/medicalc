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
      new MediData(1, 'Afoxolaner'),
      new MediData(2, 'Aminoacridin'),
      new MediData(3, 'Magnesiumsulfat'),
      new MediData(4, 'Maropitant'),
      new MediData(5, 'Fenta'),
      new MediData(6, 'Wismutaluminat'),
      new MediData(7, 'Meloxicam'),
      new MediData(8, 'Glucose'),
      new MediData(9, 'Guajacol'),
      new MediData(10, 'Cocaine'),
    ];

    return result;
  }

}
