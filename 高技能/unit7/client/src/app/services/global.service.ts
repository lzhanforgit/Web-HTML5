import { Injectable } from '@angular/core';

@Injectable(
)
export class GlobaleService {
  urlRoot:string='http://localhost:3000/';

  activeUrl='';
  constructor() {

  }

}
