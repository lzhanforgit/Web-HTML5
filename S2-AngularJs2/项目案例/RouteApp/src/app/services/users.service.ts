import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  url:string='http://localhost:3000/users';
  constructor(
    private http:HttpClient
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

  addUser(){

  }

  editUser(){

  }

}
