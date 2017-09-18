import { Injectable } from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  hiddenNavs:boolean;
  constructor() {
    this.hiddenNavs=false;
  }

}
