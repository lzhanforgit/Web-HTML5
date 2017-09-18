/**
 * Created by lzhan on 2017/8/27.
 */
import { Component} from '@angular/core';

import {UserServiceService} from './../services/user-service.service';

import {LocalStorage} from './../services/localStorage.service';

import {GlobaleService} from './../services/global.service';


import {Router}    from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[]
})
export class LoginComponent{
  tel='13812790421';
  constructor(
    private  us:UserServiceService,
    private  localStorage:LocalStorage,
    private  router:Router,
    private glo:GlobaleService

  ){


  }

  login(loginForm){
    this.us.login(loginForm.form.value).then((res)=>{
      console.log(res);
      if(res && res.stateCode==1 && res.token){
      //  存储token
        this.localStorage.set('token',res.token);
      //  页面跳转
        this.router.navigate([this.glo.activeUrl]);
      }
    })
  }

  getAllUsers(){
    this.us.getAlluser().then(res=>{
      console.log(res);
    })
  }

}
