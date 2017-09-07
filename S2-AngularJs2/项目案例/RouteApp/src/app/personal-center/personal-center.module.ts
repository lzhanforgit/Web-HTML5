import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { PersonalCenterComponent } from './personal-center.component';
import { SettingComponent } from './setting/setting.component';
import { MyMenusComponent } from './my-menus/my-menus.component';
import { MyCollectonsComponent } from './my-collectons/my-collectons.component';

//导入路由模块

import {PersonalCenterRoutingModule} from './personal-center-routing.module';



@NgModule({
  declarations: [
    PersonalCenterComponent,
    SettingComponent,
    MyMenusComponent,
    MyCollectonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterRoutingModule
  ],
  providers: [],
  bootstrap: [PersonalCenterComponent]
})
export class PersonalCenterModule { }
