/**
 * Created by lzhan on 2017/7/24.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { GoodsManagerComponent } from './goodsManager/goodsManager.component';

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
    component: GoodsManagerComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouteModule {}
