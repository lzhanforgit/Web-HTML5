import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GoodsComponent } from './goods/goods.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { NavComponent } from './nav/nav.component';
import { GoodsManagerComponent } from './goodsManager/goodsManager.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';


//导入路由模块
import { AppRouteModule } from './app-route.module';

//自定义指令
import {StyleDirective} from './directives/style.directive';

//自定义管道
import {ShrinkString} from './pipes/shrinkString.pipe';
import {SearchBooks} from './pipes/searchBooks.pipe';

//引入service
import {UserServiceService} from './services/user-service.service';
import {GlobaleService} from './services/global.service';
import {LocalStorage} from './services/localStorage.service';


//导入http

import {HttpClientModule} from '@angular/common/http';
import {PersonalCenterComponent} from './personal-center/personal-center.component';
import {AuthGuard} from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    SearchComponent,
    FiltersComponent,
    NavComponent,
    GoodsManagerComponent,
    IndexComponent,
    LoginComponent,
    PersonalCenterComponent,
  //  指令
    StyleDirective,
  //  管道
    ShrinkString,
    SearchBooks
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouteModule
  ],
  providers: [UserServiceService,GlobaleService,LocalStorage,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
