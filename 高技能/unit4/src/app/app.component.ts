import { Component,Input,Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template:`app-con->>>{{title}}`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchText:string;
  constructor(){

  }

  ngOnInit(){
    console.log('app-component=========>oninit');


  }
  getSearchValue(value){
    this.searchText=value;
  }
}
