1. 布局

    ```
     <ion-grid>
      <ion-row>
        <ion-col col-6>苏州</ion-col>
        <ion-col col-6 style="text-align: right" >...</ion-col>
      </ion-row>
    </ion-grid>
    ```

2. 页面跳转
    
    导入页面跳转模块
    
    ```
    import { NavController, NavParams } from 'ionic-angular';
    ```
    
    创建跳转对象
    
    ```
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }
    ```

    在事件中跳转+传参数
    
    ```
    this.navCtrl.push(TabsPage,{userId:'001'});
    ```
    
    在目标页中取参数
    
    ```
    //导入模块
    import { NavController, NavParams } from 'ionic-angular';
    //创建参数对象
    private navParma:NavParams
    
    //生命周期函数
    ionViewDidEnter() {
    this.tabRef.select(0);
    let id=this.navParma.get('userId');
    console.log(id);
  }
    ```
    
    
3. 图片轮播

    最好把图片轮播放在页面的头部
    
    ```
    <ion-slides autoplay="2000" loop="true" (ionSlideDidChange)="slideChanged()" #slides>
      <ion-slide *ngFor="let item of imgs" >
        <img src="assets/img/{{item}}" alt="" (click)="showImg(item)">
      </ion-slide>

    </ion-slides>
    ```
    
    事件
    
    获取轮播控件对象
    
    ```
    import { Component,ViewChild } from '@angular/core';
    
     @ViewChild(Slides) slides: Slides;
    ```
    
    ```
    slideChanged(){
    let activeIndex=this.slides.getActiveIndex();
    console.log(activeIndex);
    this.slides.startAutoplay();
  }
  showImg(img){
    console.log(img);
  }
    ```

4. list

    ```
    <ion-list no-lines>
    <ion-list-header>
      热门职位
    </ion-list-header>
    <ion-item *ngFor="let item of items" (click)="itemSelected(item)">
      <ion-avatar item-start>
        <img src="{{item?.icon_url}}">
      </ion-avatar>
      <div item-start>
        <ion-label>{{item?.post}}</ion-label>
        <ion-note>{{item?.salary}}</ion-note>
      </div>

      <ion-note item-end>{{item?.address}}</ion-note>

    </ion-item>
  </ion-list>    
  
  ```

    带侧拉按钮的list

    ```
      <ion-list no-lines>
    <ion-list-header>
      热门职位
    </ion-list-header>
    <ion-item-sliding *ngFor="let item of items">
      <ion-item  (click)="itemSelected(item)">
        <ion-avatar item-start>
          <img src="{{item?.icon_url}}">
        </ion-avatar>
        <div item-start>
          <ion-label>{{item?.post}}</ion-label>
          <ion-note>{{item?.salary}}</ion-note>
        </div>

        <ion-note item-end>{{item?.address}}</ion-note>

      </ion-item>

      <ion-item-options side="right">
        <button ion-button color="primary" (click)="deleteById(item)">
          <ion-icon name="mail"></ion-icon>
          DELETE
        </button>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
  
    ```
    
    删除代码
    
    ```
    deleteById(item) {

    for (let i = 0; i < this.items.length; i++) {
      if (item.postId === this.items[i].postId) {
        this.items.splice(i, 1);
      }
    }

  }
    ```


