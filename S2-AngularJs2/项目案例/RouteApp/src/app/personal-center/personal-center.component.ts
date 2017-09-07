import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


import {GlobalPropertyService} from './../services/global-property.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers:[]
})
export class PersonalCenterComponent implements OnInit {
  _val:string='';
  constructor(
    private router:Router,
    private glo:GlobalPropertyService
  ) { }

  ngOnInit() {
    this.glo.hiddenNavs=true;
  }

  toIndex(){
    this.router.navigate(['/index']);
    this.glo.serverUrl='http://127.0.0.1:8000';
  }

  ngOnDestroy(){
    console.log('personal-ngOnDestroy----------');
    this.glo.hiddenNavs=false;
  }
}
