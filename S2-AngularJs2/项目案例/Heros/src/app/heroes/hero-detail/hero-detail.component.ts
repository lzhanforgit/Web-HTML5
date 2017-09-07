import {Component, OnInit, Input} from '@angular/core';


//导入服务
import {HeroService} from '../../services/hero.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location}                 from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {Hero} from '../../models/hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  _hero: Hero;

  id: string;

  constructor(private hs: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    //使用快照方式获取数据
    /* let id=this.route.snapshot.paramMap.get('id');
     this.hs.getHero(id)
     .then((hero: Hero) => this.hero = hero);*/


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        console.log(params.get('id'));
        return this.hs.getHero(+params.get('id'));
      })
      .subscribe(hero => this._hero = hero);
  }

  goBack() {
    this.location.back();
  }


}
