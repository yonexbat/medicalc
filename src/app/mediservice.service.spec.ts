/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MediserviceService } from './mediservice.service';

describe('MediserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediserviceService]
    });
  });

  it('should ...', inject([MediserviceService], (service: MediserviceService) => {
    expect(service).toBeTruthy();
  }));
});
