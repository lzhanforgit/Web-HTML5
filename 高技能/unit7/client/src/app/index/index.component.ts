/**
 * Created by lzhan on 2017/8/27.
 */
import { Component} from '@angular/core';
@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class IndexComponent{
  tabs=[];
  i=0;
  constructor(){
    this.tabs=['商品详情','评论','帮助'];
  }



}
