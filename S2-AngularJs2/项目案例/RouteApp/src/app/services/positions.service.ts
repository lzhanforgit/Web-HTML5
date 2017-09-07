import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable()
export class PositionsService {

  url:string='http://localhost:3000/positions';
  constructor(
    private http:HttpClient
  ) {

  }

  getAllPositions(callback){
    this.http.get(this.url).subscribe(function (result) {
      callback(result);
    })
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
