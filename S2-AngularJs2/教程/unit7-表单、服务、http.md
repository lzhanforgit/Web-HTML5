### 一、表单
1. 表单事件

    ```
    (keyup.enter)=""
    (blur)=""
    ```
2. 表单模板
    在模板驱动表单中，你只要导入了FormsModule就不用对\<form>做任何改动来使用FormsModule。
    ```
    <form #loginForm="ngForm">
    ```
    loginForm变量是一个到NgForm指令的引用，它代表该表单的整体。
    >Angular会在\<form>标签上自动创建并附加一个NgForm指令。

    >NgForm指令为form增补了一些额外特性。 它会控制那些带有ngModel指令和name属性的元素，监听他们的属性（包括其有效性）。 它还有自己的valid属性，这个属性只有在它包含的每个控件都有效时才是真。
    
    **不要忘记表单元素要有name属性哦！！**
    >在内部，Angular 创建了一些FormControl，并把它们注册到NgForm指令，再将该指令附加到<form>标签。 注册每个FormControl时，使用name属性值作为键值。
    
3. 通过 ngModel 跟踪修改状态与有效性验证

    通过ngModel可以获取表单元素的状态，但是必要条件：
    
    * 元素要有name属性
    * 通过ngModel进行双向绑定（要绑定到ts文件中的变量）
    * 如果要显示它的状态、需要给表单定义一个模板变量（#name）
    * 通过模板变量的className属性显示

    控件被访问过: ng-touched	ng-untouched
    控件的值变化: ng-dirty	ng-pristine
    控件的值有效: ng-valid	ng-invalid
    
    我们可以通过这类样式控制表单的交互
    
    ```
    .ng-valid[required], .ng-valid.required{
      border-left: 5px solid #42A948; /* green */
    }
    
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }

    ```
    
    带状态提示框的表单
    
    ```
    <form #loginForm="ngForm">
  <div class="form-group" >
    <label for="telephone">Telephone</label>
    <input type="text" class="form-control" id="telephone" name="telephone"
           [(ngModel)]="user.name" placeholder="Email" pattern="^1[34578]\d{9}$" #myemail="ngModel" required>
  </div>
  <!--这里是提示框-->
  <div class="form-group">
    <div [hidden]="myemail.valid || myemail.pristine"
         class="alert alert-danger">
      Name is required
    </div>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" name="password" [(ngModel)]="user.password" placeholder="Password" required>
  </div>


  <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Submit</button>
</form>
    ```
4. 提交表单

    ```
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">...
    
    onSubmit(ele){
        console.log(ele.form.value);
      }
    ```
5. 表单验证

    ```
    <div class="form-group">
    <div *ngIf="myemail.invalid && (myemail.dirty || myemail.touched)"
         class="alert alert-danger">
      <div *ngIf="myemail.errors.required">
        号码不能为空
      </div>
      <div *ngIf="myemail.errors.pattern">
        号码格式不正确
      </div>

    </div>
  </div>
    ```
    
### 二、服务
1. 新建服务

    ```
    ng generate service name
    ```
    **注意**
    1. 服务是一个单例对象
    2. 服务可以在任何组件中单独注入

        ```
        providers: [GlobalService,HeroService],
        ```
2. 使用服务

    在组件中导入服务模块
    在构造函数中创建服务对象
    
### 三、Http
1. 安装HttpClient

    在使用HttpClient之前，要先安装HttpClientModule以提供它。这可以在应用模块中做，而且只需要做一次。
    
    
    ```
    import {HttpClientModule} from '@angular/common/http';
    ```
    
2. http.get()

    导入HttpClient
    
    ```
    import {HttpClient} from '@angular/common/http';

    ```
    
    发送http.get(应该放在服务中)
    
    ```
    getPositions(callback){
    this.http.get('http://localhost:3000/positions').subscribe(function (data) {
      callback(data);
    },function (error) {
      console.log(error.message);
      }

    );
  }
    ```
    
    注意这个subscribe()方法。 所有从HttpClient返回的可观察对象都是冷的（cold），也就是说，它们只是发起请求的蓝图而已。在我们调用subscribe()之前，什么都不会发生，而当我们每次调用subscribe()时，就会独立发起一次请求。
    
    ```
    const req = http.post('/api/items/add', body);
    // 0 requests made - .subscribe() not called.
    req.subscribe();
    // 1 request made.
    req.subscribe();
    // 2 requests made.
    ```
4. http.get()设置头和查询参数

    ```
    //导入模块
    import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

    let headers = new HttpHeaders({ "token": "88889999999" });
    headers.append("Accept", "application/json");
    
     let params = new HttpParams().set('myParam', 'myValue');
     
      this.http.get(this.url,{headers:headers,params:params}).subscribe(function (result) {
      callback(result);
    })
    ```
    **需要注意的是**，我们通过链式语法调用 set() 方法，构建 HttpParams 对象。这是因为 HttpParams 对象是不可变的，通过 set() 方法可以防止该对象被修改。

    每当调用 set() 方法，将会返回包含新值的 HttpParams 对象，因此如果使用下面的方式，将不能正确的设置参数。
    
    ```
    const params = new HttpParams();

    params.set('orderBy', '"$key"')
    params.set('limitToFirst', "1");
    ```
    [参考链接](https://segmentfault.com/a/1190000010259536)

4. http.post()

    ```
    login(body,callback){
    this.http.post('http://localhost:3000/users/login',body).subscribe(function (data) {
        callback(data);
      },function (error) {
        console.log(error.message);
      }

    );
  }
    ```

5. 拦截器


