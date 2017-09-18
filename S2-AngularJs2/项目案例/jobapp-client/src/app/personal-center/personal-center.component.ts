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
  constructor(
    private router:Router,
    private glo:GlobalPropertyService
  ) { }

  ngOnInit() {
    console.log('个人中心');
    this.glo.hiddenNavs=true;
    console.log(this.glo.hiddenNavs);
  }

  toIndex(){
    this.router.navigate(['/index']);
  }

  ngOnDestroy(){
    console.log('personal-ngOnDestroy----------');
    this.glo.hiddenNavs=false;
  }
}
