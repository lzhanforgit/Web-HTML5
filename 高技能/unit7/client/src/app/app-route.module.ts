/**
 * Created by lzhan on 2017/7/24.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { GoodsManagerComponent } from './goodsManager/goodsManager.component';
import { LoginComponent } from './login/login.component';

import {PersonalCenterComponent} from './personal-center/personal-center.component';


import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },

  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'goods',
    component: GoodsManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'personal-center',
    component: PersonalCenterComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouteModule {}
