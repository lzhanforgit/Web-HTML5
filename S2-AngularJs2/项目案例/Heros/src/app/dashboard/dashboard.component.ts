import { Component, OnInit } from '@angular/core';
import {Hero} from '../models/hero';

//导入服务
import {HeroService} from '../services/hero.service';

//导入路由类
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  //注册服务
  providers:[]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(
    private hs:HeroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hs.getHeroes().then((result)=>{
      this.heroes=result.slice(0,4);
    })
  }

  onSelect(hero){
    this.router.navigate(['/detail', hero.id]);
  }
}
