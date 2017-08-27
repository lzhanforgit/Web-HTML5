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


//导入路由模块
import { AppRouteModule } from './app-route.module';

//自定义指令
import {StyleDirective} from './directives/style.directive';

//自定义管道
import {ShrinkString} from './pipes/shrinkString.pipe';
import {SearchBooks} from './pipes/searchBooks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    SearchComponent,
    FiltersComponent,
    NavComponent,
    GoodsManagerComponent,
    IndexComponent,
  //  指令
    StyleDirective,
  //  管道
    ShrinkString,
    SearchBooks
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
