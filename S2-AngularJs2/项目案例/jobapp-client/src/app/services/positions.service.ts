import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders,HttpParams,HttpRequest} from '@angular/common/http';


@Injectable()
export class PositionsService {

  url:string='http://localhost:3000/positions';
  constructor(
    private http:HttpClient,
  ) {

  }

  getAllPositions(callback){

    let headers = new HttpHeaders({ "token": "88889999999" });
    headers.append("Accept", "application/json");
    let params = new HttpParams().set('myParam', 'myValue');
    //
    // let options = new HttpRequest({ headers: headers, search: params });

    this.http.get(this.url,{headers:headers,params:params}).subscribe(function (result) {
      callback(result);
    });

  }
  getPositionById(id,callback){
    this.getAllPositions(function (positions) {
      let po=positions.filter(function (item,index) {
         if(item.id==id){
           return item;
         }
      });
      callback(po);

    })
  }
}
