import { Injectable } from '@angular/core';
import {MediData} from './medi-data'

@Injectable()
export class MediserviceService {

  constructor() { }

  getMediData(): Promise<MediData[]> {
    let result = [
      new MediData(3, 'Fenta'),
      new MediData(4, 'Cocaine'),
    ];

    return Promise.resolve(result);
  }

}
