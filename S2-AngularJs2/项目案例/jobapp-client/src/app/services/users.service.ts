import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';


import { LocalStorage } from '../services/localStorage.service';

@Injectable()
export class UsersService {

  url:string='http://localhost:3000/users';
  constructor(
    private http:HttpClient,
    private ls:LocalStorage
  ) {

  }

  login(user,callback){
    this.http.post(this.url+'/login',user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }

    )
  }

  getAllUsers(){
    let _head=new HttpHeaders({token:this.ls.get('token')});

    let param=new HttpParams().set('id','0011111');
    


    this.http.get(this.url+'/getAllUsers',{headers:_head,params:param}).subscribe(
      function (result) {
        console.log('>>>>>>>>>>>>>>>>>>>>');
        console.log(result);
      },
      function (error) {
        console.log(error.message);
      }

    )

  }

}
