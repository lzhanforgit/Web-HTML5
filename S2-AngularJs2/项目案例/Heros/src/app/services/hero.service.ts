import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import {Hero} from '../models/hero';
import {HEROES} from '../datas/data-heroes';
import { GlobalService } from './global.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  url='';
  constructor(
    private glo:GlobalService,
    private http:Http

  ) { }

  getHeroes(): Promise<Hero[]>{
    // return this.http.get('localhost:3000').toPromise().then(function (response) {
    //   return response.json().data;
    // });
    return Promise.resolve(HEROES);

  }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

}
