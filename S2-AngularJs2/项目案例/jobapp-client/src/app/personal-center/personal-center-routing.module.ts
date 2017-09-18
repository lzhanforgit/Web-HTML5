/**
 * Created by lzhan on 2017/9/3.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalCenterComponent} from './personal-center.component';
import {SettingComponent} from './setting/setting.component';
import {MyMenusComponent} from './my-menus/my-menus.component';
import {MyCollectonsComponent} from './my-collectons/my-collectons.component';
const routes: Routes = [

  {
    path: 'personal-center',
    component: PersonalCenterComponent,
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
        component: MyCollectonsComponent,
      },
      {
        path: '',
        component: MyMenusComponent,
      }]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCenterRoutingModule {
}
