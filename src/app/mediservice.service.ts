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
    this.url = "/assets/jsons/medi-data-list.json"
  }


  private getMediObjeservable() : Observable<MediData>
  {
      return this.http
               .get(this.url)
               .map(response => { 
                  let data = response.json();
                  let medidata = data as MediData[];
                  return medidata;
                })
                .concatMap(array => Observable.from(array))
  }

  public getMedi(id: number) : Promise<MediData>
  {
        return this.getMediObjeservable()
                .filter(medi => medi.Id === id)
                .first()
                .toPromise();
  }

 
  public getMedisForMediName(mediName: string) : Observable<MediData[]> 
  {  
      return this.getMediObjeservable()
                .filter(medi => medi.Name == mediName)
                .toArray();
  }   

  public searchMediData(searchtearm: string) : Observable<string[]> 
  {  

    return this.getMediObjeservable()
                .groupBy(medi => medi.Name)
                .map(mediGroup => mediGroup.key)
                .filter(mediName => {
                        let searchTearmUpperCase = searchtearm.toUpperCase();
                        let mediNameUpperCase = mediName.toUpperCase();                       
                        return mediNameUpperCase.includes(searchTearmUpperCase);
                 })
                .take(6)
                .toArray()
                .map(medinameArray => {                   
                    let sortedArray : string[]  = medinameArray.sort();
                    if(sortedArray.length > 5)
                    {
                      sortedArray.pop();
                      sortedArray.push("...");
                    }
                    return sortedArray;
                });                
  }
}
