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
  _url:string;
  _hiddenNavs:boolean;
  constructor(
    private  glo:GlobalPropertyService
  ){}

  ngOnInit(){
      this._url=this.glo.serverUrl;
      this._hiddenNavs=this.glo.hiddenNavs;
  }

  ngAfterContentChecked() {
    this._url=this.glo.serverUrl;
    this._hiddenNavs=this.glo.hiddenNavs;
  }
}
