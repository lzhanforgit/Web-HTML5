/**
 * Created by lzhan on 2017/8/27.
 */
import { Component} from '@angular/core';

import {UserServiceService} from './../services/user-service.service';

import {LocalStorage} from './../services/localStorage.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: 'personal-center.component.html',
  styleUrls: ['personal-center.component.css'],
  providers:[]
})
export class PersonalCenterComponent{

  constructor(
    private  us:UserServiceService,
    private  localStorage:LocalStorage

  ){


  }

  ngOnInit(){

  }

}
