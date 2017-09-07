import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './root/app.component';
import { GlobalService } from './services/global.service';
import { DashboardComponent } from './dashboard/dashboard.component';

//导入路由模块
import { AppRoutingModule }   from './app-routing.module';

//导入服务
import {HeroService} from './services/hero.service';
//导入http
import { HttpModule }    from '@angular/http';
import { HeroesModule }    from './heroes/heroes.module';
import { PersonalModule }    from './personal-center/personal.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeroesModule,
    PersonalModule,
    AppRoutingModule
  ],
  providers: [GlobalService,HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
