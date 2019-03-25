1. 表单及表单验证
    带验证的表单
    
    ```
     <form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)" novalidate>
          <ion-item [class.error]="!username.valid && username.touched">
            <ion-input type="tel" placeholder="请输入用户名" value="" [formControl]="username" clearInput=true></ion-input>
          </ion-item>
          <ion-label *ngIf="username.hasError('required') && username.touched" class="error-message">* 请输入用户名</ion-label>
          <ion-label *ngIf="(username.hasError('minlength')||username.hasError('maxlength')||username.hasError('pattern')) && username.touched" class="error-message">* 请输入正确的电话号码</ion-label>
          <ion-item>
            <ion-input type="password" placeholder="请输入密码" value="" [formControl]="password" clearInput=true></ion-input>
          </ion-item>
          <ion-label *ngIf="password.hasError('required') && password.touched" class="error-message">* 请输入密码</ion-label>
          <ion-label *ngIf="(password.hasError('minlength')) && password.touched" class="error-message">* 密码长度最少为六位</ion-label>
          <button ion-button block color="secondary" type="submit" [disabled]="!loginForm.valid">登录</button>
        </form>
    ```
    
    配合的TS文件
    
    ```
    import { FormBuilder, Validators, FormGroup } from '@angular/forms';


    loginForm: FormGroup;
  username: any;
  password: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private appCtrl: App,
    private storage:Storage,
    private userSer:UsersService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }
    ```
2. service

    **具体新建Service 并导入到应用请参照angular2的内容**
    
    导入promise模块
    
    ```
    import 'rxjs/add/operator/toPromise';
    ```

    ```
    getAllPositions():Promise<any>{
    let headers = new HttpHeaders({ "token": "88889999999" });
    headers.append("Accept", "application/json");
    let params = new HttpParams().set('myParam', 'myValue');
    //
    // let options = new HttpRequest({ headers: headers, search: params });

    // this.http.get(this.url,{headers:headers,params:params}).subscribe(function (result) {
    //   callback(result);
    // });


    return this.http.get(this.url,{headers:headers,params:params})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
  getPositionById(id):Promise<any>{
    return this.getAllPositions().then( (positions)=> {
      let po=positions.filter(function (item,index) {
        if(item.id==id){
          return item;
        }
      });
      return po;
    }).catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
    ```
    
    在页面事件中调用
    
    ```
         this.positionSer.getPositionById(3).then(res=>{
          console.log(res);
        },err=>{
          console.log(err)
        });
    ```



