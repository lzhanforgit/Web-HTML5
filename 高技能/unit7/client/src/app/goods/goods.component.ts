/**
 * Created by lzhan on 2017/8/27.
 */
import { Component,Input,OnInit } from '@angular/core';
import {data} from './../services/data/data.service';
@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit{
  goods:any;
  @Input() _searchValue;
  constructor(){
    this.goods=data.goods;
  }

  ngOnChanges(){
    console.log('good-component=========>ngOnChanges'+this._searchValue);

  }
  ngOnInit(){
    console.log('good-component=========>oninit');
  }


  ngDoCheck(){
    console.log('good-component------------------->ngDoCheck');
  }
}
