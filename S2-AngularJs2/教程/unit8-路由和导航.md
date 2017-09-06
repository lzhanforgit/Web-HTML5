### 一、路由
1. 概述

    大多数带路由的应用都要在index.html的<head>标签下先添加一个<base>元素，来告诉路由器该如何合成导航用的URL。
2. 配置路由

    ```
    //导入模块
    import { RouterModule, Routes } from '@angular/router';
    配置路由表
        const appRoutes: Routes = [
      { path: 'crisis-center', component: CrisisListComponent },
      { path: 'hero/:id',      component: HeroDetailComponent },
      {
        path: 'heroes',
        component: HeroListComponent,
        data: { title: 'Heroes List' }
      },
      { path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
      },
      { path: '**', component: PageNotFoundComponent }
    ];
    
    @NgModule({
      imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )
        // other imports here
      ],
      ...
    })
    export class AppModule { }
    
    ```
    
    每个定义都被翻译成了一个Route对象。该对象有一个path字段，表示该路由中的URL路径部分，和一个component字段，表示与该路由相关联的组件。
    
    重定向路由需要一个pathMatch属性，来告诉路由器如何用URL去匹配路由的路径，否则路由器就会报错。 在本应用中，路由器应该只有在完整的URL等于''时才选择HeroListComponent组件，因此我们要把pathMatch设置为'full'。
    >从技术角度说，pathMatch = 'full'导致URL中剩下的、未匹配的部分必须等于''。 在这个例子中，跳转路由在一个顶级路由中，因此剩下的URL和完整的URL是一样的。

    >pathMatch的另一个可能的值是'prefix'，它会告诉路由器：当剩下的URL以这个跳转路由中的prefix值开头时，就会匹配上这个跳转路由。

    >在这里不能这么做！如果pathMatch的值是'prefix'，那么每个URL都会匹配上''。

    >尝试把它设置为'prefix'，然后点击Go to sidekicks按钮。别忘了，它是一个无效URL，本应显示“Page not found”页。 但是，我们看到了“英雄列表”页。在地址栏中输入一个无效的URL，我们又被路由到了/heroes。 每一个URL，无论有效与否，都会匹配上这个路由定义。

    >默认路由应该只有在整个URL等于''时才重定向到    HeroListComponent，别忘了把重定向路由设置为pathMatch = 'full'。


    
    ```
    
    // 使用路由=====================
    
    template: `
      <h1>Angular Router</h1>
      <nav>
        <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        //传递参数的情况
         <a [routerLink]="['/index','我是默认值']" routerLinkActive="active" >首页</a>
        <!--<a routerLink='/index/我是默认值'routerLinkActive="active" >首页</a>-->
      </nav>
      <router-outlet></router-outlet>
    `
    ```
    >每个a标签上的RouterLinkActive指令可以帮用户在外观上区分出当前选中的“活动”路由。 当与它关联的RouterLink被激活时，路由器会把CSS类active添加到这个元素上。
    
    当需要传递参数时
    
    ```
        <a [routerLink]="['/detail',hero.id]">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </a>
    ```
3. 多级路由
    1. 新建一个模块文件夹（比如商品，包含列表、详情、评论等组件）。将各组件移入该文件夹
    2. 模仿app.module.ts新建一个module(如goods.module.ts),并在app.module.ts中注册、imports
        
        **路由配置的顺序很重要。 路由器会接受第一个匹配上导航所要求的路径的那个路由。**
        所以我们应该把AppRoutingModule放在最下面
        
        ```
        //app.module.ts
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            GoodsModule, //这个是新建的子模块
            AppRoutingModule
          ],
        ```
    
    3. 新建子模块的路由

        ```
        import { RouterModule, Routes } from '@angular/router';
        import { HeroDetailComponent } from './hero-detail/hero-detail.component';
        import { HeroesComponent } from './heroes.component';
        const routes: Routes = [
        
          {
            path: 'heroes',
            component: HeroesComponent
          },
          {
            path: 'detail/:id',
            component: HeroDetailComponent
          },
        ];
        
        @NgModule({
          imports: [ RouterModule.forChild(routes) ],
          exports: [ RouterModule ]
        })
        export class HeroesRoutingModule {}

        ```
        
    **注意：RouterModule.forChild(routes)**
    4. 去掉AppRoutingModule重复的部分



4. 路由跳转

    ```
    //导入路由类
    import {Router} from '@angular/router';
    constructor(
        private hs:HeroService,
        private router: Router,
      ) { }
  
      onSelect(hero){
        this.router.navigate(['/detail', hero.id]);
      }
    ```
5. 获取路由信息
    
    ```
    import { Component, OnInit,Input } from '@angular/core';
    
    
    //导入服务
    import {HeroService} from '../../services/hero.service';
    import { ActivatedRoute, ParamMap } from '@angular/router';
    import { Location }                 from '@angular/common';
    
    import 'rxjs/add/operator/switchMap';
    import {Hero} from '../../models/hero';
    @Component({
      selector: 'app-hero-detail',
      templateUrl: 'hero-detail.component.html',
      styleUrls: ['hero-detail.component.css']
    })
    export class HeroDetailComponent implements OnInit {
      _hero:Hero;
    
      id:string;
      constructor(
        private hs:HeroService,
        private route: ActivatedRoute,
        private location: Location
      ) { }
    
      ngOnInit() {
        //使用快照方式获取数据
       /* let id=this.route.snapshot.paramMap.get('id');
        this.hs.getHero(id)
          .then((hero: Hero) => this.hero = hero);*/
    
        
        this.route.paramMap
          .switchMap((params: ParamMap) => this.hs.getHero(+params.get('id')))
          .subscribe(hero => this._hero = hero);
      }
      
      //可以这么写
       /*this.route.paramMap
      .switchMap((params: ParamMap) => {
        console.log(params.get('id'));
        return this.hs.getHero(+params.get('id'));
      })
      .subscribe(hero => this._hero = hero);*/
    
        goBack(){
          this.location.back();
        }
    
    
    }
    
    ```
    
### 二、子路由
构建子路由步骤

1. 构建子路由中的组件
       
    ``` 
        PersonalCenterComponent,
        MyMenusComponent,
        MyCollectionsComponent,
        SettingComponent
    ```
    其中PersonalCenterComponent为子路由导航组件，内部含有新的\<router-outlet>\</router-outlet>
    
    ```
    <h1>个人中心</h1>
    <div>
      <div class="col-lg-12 col-md-12">
        <a routerLink="./setting">setting</a>
        <a routerLink="./menus">menus</a>
        <a routerLink="./collections">collections</a>
      </div>
    </div>
    <router-outlet></router-outlet>
    ```
    
    ** 注意 routerLink='./' **
    
2. 构建子路由模块，并导入上一步构建的组件

    ```

    import { NgModule }       from '@angular/core';
    import { CommonModule }   from '@angular/common';
    import { FormsModule }    from '@angular/forms';
    import {PersonalCenterComponent} from './personal-center.component';
    import {MyMenusComponent} from './my-menus/my-menus.component';
    import {SettingComponent} from './setting/setting.component';
    import {MyCollectionsComponent} from './my-collections/my-collections.component';
    import {PersonalRoutingModule} from './personal-routing.module';
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
      providers: [  ]
    })
    export class PersonalModule {}

    ```
3. 构建子模块的路由（注意 imports: [RouterModule.forChild(routes)]）

    ```
    import {NgModule}             from '@angular/core';
    import {RouterModule, Routes} from '@angular/router';
    import {PersonalCenterComponent} from './personal-center.component';
    import {MyMenusComponent} from './my-menus/my-menus.component';
    import {SettingComponent} from './setting/setting.component';
    import {MyCollectionsComponent} from './my-collections/my-collections.component';
    
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
    
    ```
4. 把子模块导入到app.module.ts

    注意放置的顺序，要放在根路由的上面
    
    ```
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeroesModule,       //二级路由
    PersonalModule,     //个人中心模块
    AppRoutingModule   //根路由
  ],
    ```

### 三、路由守卫

可以往路由配置中添加守卫，守卫返回一个值，以控制路由器的行为：

* 如果它返回true，导航过程会继续
* 如果它返回false，导航过程会终止，且用户会留在原地。

守卫对象：

* 用CanActivate来处理导航到某路由的情况。
* 用CanActivateChild来处理导航到某子路由的情况。
* 用CanDeactivate来处理从当前路由离开的情况.
* 用Resolve在路由激活之前获取路由数据。
* 用CanLoad来处理异步导航到某特性模块的情况。

1. CanActivate

    应用程序通常会根据访问者来决定是否授予某个特性区的访问权。 我们可以只对已认证过的用户或具有特定角色的用户授予访问权，还可以阻止或限制用户访问权，直到用户账户激活为止。

    CanActivate守卫是一个管理这些导航类业务规则的工具。
    
    使用守护路由的步骤
    
    1. 创建
    
        ```
        import { Injectable }     from '@angular/core';
        import { CanActivate }    from '@angular/router';
        
        @Injectable()
        export class AuthGuard implements CanActivate {
          canActivate() {
            console.log('AuthGuard#canActivate called');
            return false;
          }
        }
        ```
        注意它是一个service
    
    2. 子子模块中注册
        
        ```
          providers: [AuthGuard]
        ```
    3. 在子路由的路由表中使用

        ```
        //路由守护
          import { AuthGuard }                from '../services/auth-guard.service'
          const routes: Routes = [
            {
              path: 'personal-center',
              component: PersonalCenterComponent,
              canActivate: [AuthGuard],  //注意这里****
              children: [
                {
                  path: 'setting',
                  component: SettingComponent,
          
                },
        ```


