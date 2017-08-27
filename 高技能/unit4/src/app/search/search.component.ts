/**
 * Created by lzhan on 2017/8/27.
 */
import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  // template:`app-con->>>{{title}}`,
  styleUrls: ['search.component.css']
})
export class SearchComponent {
  searchText='';
  @Output() send_text:EventEmitter<string> = new EventEmitter();

  constructor(){

  }

  sendText(txt){
    this.send_text.emit(txt);
  }
}
