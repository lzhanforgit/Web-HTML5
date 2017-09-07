/**
 * Created by lzhan on 2017/9/3.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalCenterComponent} from './personal-center.component';
import {MyMenusComponent} from './my-menus/my-menus.component';
import {SettingComponent} from './setting/setting.component';
import {MyCollectionsComponent} from './my-collections/my-collections.component';

  //路由守护
  import { AuthGuard }                from '../services/auth-guard.service'
  const routes: Routes = [
    {
      path: 'personal-center',
      component: PersonalCenterComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'setting',
          component: SettingComponent,

        },
      {
        path: 'menus',
        component: MyMenusComponent,
      },
      {
        path: 'collections',
        component: MyCollectionsComponent,
      },
      {
        path: '',
        component: MyMenusComponent,
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
