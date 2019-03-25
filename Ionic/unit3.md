1. 页面跳转

    ```
     public viewCtrl: ViewController,
    
    //dismiss表示把当前页面弹出视图栈顶，但是弹出之前必须保证当前页面不是栈最底部的页面
     this.viewCtrl.dismiss();
     
     let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
     
    ```

2. 跳转到模态页面
    
    ```
    import {ModalController } from 'ionic-angular';
    
    public modalCtrl: ModalController
     
    
    const profileModal = this.modalCtrl.create(PostDetailPage, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();

    ```
    
    模态页面返回的时候带上数据
    
    ```
    this.viewCtrl.dismiss({'status':'i am back'});
    ```
3. 页面的生命周期

    
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
4. 本地缓存
5. 


