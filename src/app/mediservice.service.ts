import { Injectable } from '@angular/core';
import {MediData} from './medi-data';
import { Http }       from '@angular/http';

//import { Observable }     from 'rxjs/Observable';
import {Observable} from 'rxjs';

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

  public getMediData(): Observable<MediData[]> {
    let result = this.getMediDataInternal();
    return result;
  }

  public searchMediData(searchtearm: string) : Observable<MediData[]> 
  {  

    let arrayObservable = this.getMediDataInternal()
      .map( array => 
          {
                let result = [];
                array.forEach(element => 
                  {

                    let searchTearmUpperCase = searchtearm.toUpperCase();
                    let mediNameUpperCase = element.Name.toUpperCase();

                    if(mediNameUpperCase.includes(searchTearmUpperCase))
                    {
                      result.push(element);
                    }
                  });
                return result;                 
         })

    return arrayObservable;   
  }

  private getMediDataInternal(): Observable<MediData[]> {

      return this.http
               .get(this.url)
               .map(response => { 
                  let data = response.json();
                  let medidata = data as MediData[];
                  return medidata;
                });      
  }

}
