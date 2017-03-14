import { Injectable } from '@angular/core';
import {MediData} from './medi-data';
import { Http }       from '@angular/http';


import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';


@Injectable()
export class MediserviceService {

  private http: Http;

  private url: string;


  constructor(http: Http) { 
    this.http = http;
    this.url = "./app/medi-data-list.json";
  }


 
  public getMedisForMediName(mediName: string) : Observable<MediData[]> 
  {  
      return this.http
               .get(this.url)
               .map(response => { 
                  let data = response.json();
                  let medidata = data as MediData[];
                  return medidata;
                })
                .concatMap(array => Observable.from(array))
                .filter(medi => medi.Name == mediName)
                .toArray();
  }  

  public searchMediData(searchtearm: string) : Observable<string[]> 
  {  

    return this.http
               .get(this.url)
               .map(response => { 
                  let data = response.json();
                  let medidata = data as MediData[];
                  return medidata;
                })
                .concatMap(array => Observable.from(array))
                .groupBy(medi => medi.Name)
                .map(mediGroup => mediGroup.key)
                .filter(mediName => {
                        let searchTearmUpperCase = searchtearm.toUpperCase();
                        let mediNameUpperCase = mediName.toUpperCase();                       
                        return mediNameUpperCase.includes(searchTearmUpperCase);
                 })
                .toArray();
  }
}
