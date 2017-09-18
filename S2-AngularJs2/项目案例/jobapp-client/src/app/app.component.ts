import { Component,ViewChild } from '@angular/core';

import {GlobalPropertyService} from './services/global-property.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent {
  title = 'app';
  _hiddenNavs:boolean;
  constructor(
    private  glo:GlobalPropertyService
  ){}

  ngOnInit(){
    this._hiddenNavs=this.glo.hiddenNavs;
  }
  ngAfterContentChecked() {
    console.log('导航部分' +this.glo.hiddenNavs);
    this._hiddenNavs=this.glo.hiddenNavs;

  }
}
