/**
 * Created by lzhan on 2017/9/4.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {PersonalCenterComponent} from './personal-center.component';
import {MyMenusComponent} from './my-menus/my-menus.component';
import {SettingComponent} from './setting/setting.component';
import {MyCollectionsComponent} from './my-collections/my-collections.component';
import {PersonalRoutingModule} from './personal-routing.module';

import { AuthGuard }                from '../services/auth-guard.service'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonalRoutingModule
  ],
  declarations: [
    PersonalCenterComponent,
    MyMenusComponent,
    MyCollectionsComponent,
    SettingComponent
  ],
  providers: [AuthGuard]
})
export class PersonalModule {}
