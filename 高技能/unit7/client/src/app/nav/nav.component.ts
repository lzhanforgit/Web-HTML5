/**
 * Created by lzhan on 2017/8/27.
 */
import { Component} from '@angular/core';
import {nav} from './../services/data/data.service';
@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})
export class NavComponent{
  nav_items:any
  constructor(){
    this.nav_items=nav;
  }



}
