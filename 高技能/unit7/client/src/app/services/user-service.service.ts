import { Injectable } from '@angular/core';
import {GlobaleService} from './global.service';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {LocalStorage} from './../services/localStorage.service';

import 'rxjs/add/operator/toPromise';

@Injectable(

)
export class UserServiceService {

  // url:string='http://localhost:3000/users/';
  constructor(
    private  glo:GlobaleService,
    private http:HttpClient,
    private  ls:LocalStorage
  ) { }

  login(body):any{
    let url=this.glo.urlRoot+'users/login';

    return this.http.post(url,body).toPromise()
       .catch(error=>console.log(error.message))
  }


  getAlluser():any{

    let url=this.glo.urlRoot+'users/getAllUsers';
    let headers = new HttpHeaders({ "token": this.ls.get('token')});

    // let params = new HttpParams().set('id', '001');
    return this.http.get(url,{headers:headers}).toPromise();
  }
}
