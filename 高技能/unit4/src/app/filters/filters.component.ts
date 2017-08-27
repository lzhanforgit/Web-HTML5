/**
 * Created by lzhan on 2017/8/27.
 */
import { Component,Input } from '@angular/core';
import {brand} from './../services/data/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent {
  brand:any;
  constructor(){
    this.brand=brand
  }

}
