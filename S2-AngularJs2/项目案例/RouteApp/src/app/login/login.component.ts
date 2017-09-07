import { Component, OnInit } from '@angular/core';


import {UsersService} from './../services/users.service';
import {Router} from '@angular/router';
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
    private router:Router

  ) { }

  // _telephone='13812790421';
  // _password='1234567';

  ngOnInit() {
  }
  //单例  单一的实例
  toLogin(login_form){
    let that=this;
    that.userSer.login(login_form.form.value,function (result) {

      if(result.stateCode==1){
        that.router.navigate(['/index',3]);
      }else {
        alert(result.stateCode);
        that.login_res='用户名或密码错误';
      }
    })
  }
}
