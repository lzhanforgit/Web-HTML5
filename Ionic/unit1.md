1. 生成页面
    在项目根目录下，执行指令
    ```
        ionic g page NewPage
    ```

2. 在使用 ionic g page xxxx 生成ionic2组件时，报错：
    ```
        Property 'forChild'
        does not exist on type 'typeof IonicModule'.
    ```
    解决方案：

    ```
        第一步：将IonicModule.forChild的IonicModule
        改成：IonicPageModule.forChild

        第二步：修改引入：
        import {IonicPageModule } from 'ionic-angular';
    ```

3. 新建项目

    ```
        ionic start MyIonic2Project 【tutorial】 --v2
    ```

4. 图标列表

    ```

     <!--<span ion-text color="primary" showWhen="ios">Cancel</span>-->
            <ion-icon name="arrow-back" showWhen="android, windows,ios"></ion-icon>
    http://www.cnblogs.com/dandingjun/p/5562516.html
    ```

5. 页面跳转

    以页面跳转的方式打开页面
    ```
    //1
    import { IonicPage, NavController, NavParams } from 'ionic-angular';

    //2
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage) {
      }

    //3
    this.navCtrl.push(TabsPage);

    ```

    以模态窗口方式打开页面

    ```
    //1
    import { ModalController } from 'ionic-angular';

    //2
     constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController)

    //3

     let modal = this.modalCtrl.create(PositionDatailsPage, {item: item});
     modal.present();

    ```
5. 下拉刷新和上拉加载

    刷新控件和内容要分离

    ```
    //控件
    <ion-content >
      <ion-refresher (ionRefresh)="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>

    //n内容
      <ion-list >
        <ion-item-sliding *ngFor="let item of items" (click)="itemTapped($event, item)">
          <ion-item >
            <ion-avatar item-left>
              <img src="{{item.icon_url}}">
            </ion-avatar>
            <h2>{{item.post}}</h2>
            <p style="color: red">{{item.salary}} 万</p>
            <p>{{item.address}}</p>

          </ion-item>
        </ion-item-sliding>

      </ion-list>

    </ion-content>
    ```

    js部分

    ```
    doRefresh(refresher) {

        setTimeout(() => {
          console.log('Async operation has ended');

          <!--更新数据部分-->
          this.items=[
            {
              postId:'001',
              icon_url:'assets/img/smile.png',
              post:'微软总经理',
              salary:'120-1000',
              address:'苏州仁爱路1号'
            }
          ];
          refresher.complete();
        }, 2000);
      }
    ```


    上拉加载更多

    ```
     <!--上拉加载-->

      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    ```

    js部分

    ```
    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
         this.items.push({
           postId:'003',
           icon_url:'assets/img/smile.png',
           post:'ibm总经理',
           salary:'120-1000',
           address:'苏州仁爱路3号'
         })
          infiniteScroll.complete();
        }, 500);
      }
    ```


    或者

    ```
     <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    ```

    ```
     doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        return new Promise((resolve) => {
          setTimeout(() => {
            this.items.push({
              postId:'003',
              icon_url:'assets/img/smile.png',
              post:'ibm总经理',
              salary:'120-1000',
              address:'苏州仁爱路3号'
            });
            resolve();
          }, 500);
        })

      }
    ```

6. 本地缓存

    http://ionicframework.com/docs/storage/

7. 判断是否登录
    在app.component.ts 中
    ```
    //....
    import { LoginPage } from '../pages/login/login';
    import { TabsPage } from '../pages/tabs/tabs';

    import {Storage} from '@ionic/storage';

    @Component({
      templateUrl: 'app.html'
    })
    export class MyApp {
     //将启动页面设为空
      rootPage:any = '';

      constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      //引入存储对象
      storage: Storage) {
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();

          storage.ready().then(() => {
            storage.get('telephone').then((val) => {
            // 判断是否登录，决定启动哪个页面
              if(val==='13812790420'){
                this.rootPage=TabsPage
              }else {
                this.rootPage=LoginPage
              }
            })
          });
        });
      }
    }

    ```

7. 页面生命周期

    ```
        Event	            Desc

        ionViewDidLoad	    当页面加载的时候触发，仅在页面创建的时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发

        ionViewWillEnter	顾名思义，当将要进入页面时触发

        ionViewDidEnter	    当进入页面时触发

        ionViewWillLeave	当将要从页面离开时触发

        ionViewDidLeave	    离开页面时触发

        ionViewWillUnload	当页面将要销毁同时页面上元素移除时触发

        ionViewCanEnter

        ionViewCanLeave


    ```

8.