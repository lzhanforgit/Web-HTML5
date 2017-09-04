&copy;詹亮                     - site : https://github.com/lzhanforgit/H5Resources
##### 预备知识
1. class

    ```
        class User{
        constructor(id,name,pass){
            this.id=id;
            this.name=name;
            this.password=pass;
        }
        show(){
            console.log(this.name);
        }
    }
    
    
    
    class Admin extends User{
        constructor(id,name,pass,type){
            super(id,name,pass);
            this.type=type;
        }
    }
    
    var ad=new Admin('001','TOM','888','boss');
    
    ad.show();
    
    console.log(ad.id);
    ```

2. import export

    ```
        //export
        export var num=12;
        export var add=function (a,b) {
            return a+b;
        }
        //import
        import {num} from './4-export';
        import {add} from './4-export';
        
        var res=add(10,20);
        
        console.log(res);
    ```

====
1. 简介

    >AngularJS2 是 Angular 1.x 的升级版本，性能上得到显著的提高，能很好的支持 Web 开发组件。
     AngularJS2 发布于2016年9月份，它是基于ES6来开发的。

2. 安装 Angular CLI

    ```
        npm install -g @angular/cli
        //mac 电脑
        sudo npm install -g @angular/cli
    ```

    由于 npm 官网镜像国内访问太慢，这里我使用了淘宝的npm镜像，安装方法如下：

    ```

    $ npm install -g cnpm --registry=https://registry.npm.taobao.org

    //执行后我们就可以使用 cnpm 命令来安装模块：
    $ cnpm install

    ```

3. 手动javascript创建项目

    1. 新建 package.json

        ```
        npm init
        ```
        结果：

        ```
        {
          "name": "firstproject",
          "version": "1.0.0",
          "description": "first test project",
          "main": "index.js",
          "scripts": {
            "start": "npm run lite",
            "lite": "lite-server"
          },
          "author": "lzhan",
          "license": "ISC",
          "dependencies": {
            "@angular/common": "2.0.0",
            "@angular/compiler": "2.0.0",
            "@angular/core": "2.0.0",
            "@angular/forms": "2.0.0",
            "@angular/http": "2.0.0",
            "@angular/platform-browser": "2.0.0",
            "@angular/platform-browser-dynamic": "2.0.0",
            "@angular/router": "3.0.0",
            "@angular/upgrade": "2.0.0",

            "core-js": "^2.4.1",
            "reflect-metadata": "^0.1.3",
            "rxjs": "5.0.0-beta.12",
            "zone.js": "^0.6.23",

            "angular2-in-memory-web-api": "0.0.20",
            "bootstrap": "^3.3.6"
          },
          "devDependencies": {
            "concurrently": "^2.0.0",
            "lite-server": "^2.2.0"
          }
        }

        ```

    2. 安装依赖

        ```
        cnpm install

        ```
    3. 源码见 pro01

    4. 启动

        ```
            npm start

        ```

4. 手动TypeScript 创建项目

    创建配置文件

    * Angular 项目需要以下几个配置文件：
    * package.json 标记本项目所需的 npm 依赖包。
    * tsconfig.json 定义了 TypeScript 编译器如何从项目源文件生成 JavaScript 代码。
    * typings.json为那些 TypeScript 编译器无法识别的库提供了额外的定义文件。
    * systemjs.config.js 为模块加载器提供了该到哪里查找应用模块的信息，并注册了所有必备的依赖包。 它还包括文档中后面的例子需要用到的包。

5. 利用cli 生成项目

    ```
    ng new appname

    //运行项目

    npm start 或者

    ng serve
    ```
6. 利用cli 生成组件

    ```
    *     ng generate component my-comp - 生成一个新组件，同时生成其测试规格和相应的HTML/CSS文件
    *     ng generate directive my-directive - 生成一个新指令
    *     ng generate pipe my-pipe - 生成一个新管道
    *     ng generate service my-service - 生成一个新服务
    *     ng generate route my-route - 生成一个新路由
    *     ng generate class my-class - 生成一个简易的模型类
    ```


