import { Component, OnInit } from '@angular/core';
import {Hero} from '../models/hero';

//导入服务
import {HeroService} from '../services/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  //注册服务
  providers:[]
})
export class HeroesComponent implements OnInit {

  selectedHero:Hero;
  heroes: Hero[];
  //创建服务对象
  constructor(private hs:HeroService){

  }
  ngOnInit(){
    this.getHeroes();
  }

  getHeroes(){
    let that=this;
    that.hs.getHeroes().then(function (reslut) {
      that.heroes=reslut;
    })
  }
  onSelect(hero,callback){
    this.selectedHero=hero;
  }

}
