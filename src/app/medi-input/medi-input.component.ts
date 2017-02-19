import { Component, OnInit } from '@angular/core';
import {MediserviceService} from './../mediservice.service';

@Component({
  selector: 'app-medi-input',
  templateUrl: './medi-input.component.html',
  styleUrls: ['./medi-input.component.css'],
  providers: [MediserviceService]
})
export class MediInputComponent implements OnInit {



  constructor(private mediInputService: MediserviceService) { }

  ngOnInit() {
  }



}
