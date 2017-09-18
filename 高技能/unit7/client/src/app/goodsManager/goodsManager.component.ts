/**
 * Created by lzhan on 2017/8/27.
 */
import { Component} from '@angular/core';

@Component({
  selector: 'app-goodsManager',
  templateUrl: 'goodsManager.component.html',
  styleUrls: ['./goodsManager.component.css']
})
export class GoodsManagerComponent{
  searchText:string;
  getSearchValue:any;
  constructor(){

  }
}
