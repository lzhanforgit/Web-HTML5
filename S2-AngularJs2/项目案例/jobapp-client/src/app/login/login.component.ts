import { Component, OnInit } from '@angular/core';


import {UsersService} from './../services/users.service';
import {Router} from '@angular/router';

import { LocalStorage } from '../services/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsersService]
})
export class LoginComponent implements OnInit {

  login_res:string;
  constructor(
    private userSer:UsersService,
    private router:Router,
    private localstorage:LocalStorage

  ) { }

  // _telephone='13812790421';
  // _password='1234567';

  ngOnInit() {
  }
  //单例  单一的实例
  toLogin(login_form){
    let that=this;
    that.userSer.login(login_form.form.value,function (result) {
      if(result){
        if(result.stateCode==1){

          //存储token到本地
          that.localstorage.set('token',result.token);

          alert('token'+that.localstorage.get('token'));

          that.router.navigate(['/index']);
        }else {
          alert(result.stateCode);
          that.login_res='用户名或密码错误';
        }
      }

    })
  }


  getAll(){
    let that=this;
    that.userSer.getAllUsers();
  }
}
