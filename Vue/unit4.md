### Vue.js
一、 发送AJAX请求

### 1. 简介
    vue本身不支持发送AJAX请求，需要使用vue-resource、axios等插件实现
    axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新和维护

    参考：GitHub上搜索axios，查看API文档

### 2. 使用axios发送AJAX请求

#### 2.1 安装axios并引入
    npm install --save axios
    也可直接下载axios.min.js文件
    
    在组件中引入。。。
    <script>
  		import axios from 'axios';

#### 2.2 基本用法
    axios([options])
    axios.get(url[,options]);
        传参方式：
            1.通过url传参
            2.通过params选项传参
    axios.post(url,data,[options]);
        axios默认发送数据时，数据格式是Request Payload，并非我们常用的Form Data格式，
        所以参数必须要以键值对形式传递，不能以json形式传参
        传参方式：
            1.自己拼接为键值对
            2.使用transformRequest，在请求发送前将请求数据进行转换
            3.如果使用模块化开发，可以使用qs模块进行转换

    axios本身并不支持发送跨域的请求，没有提供相应的API，作者也暂没计划在axios添加支持发送跨域请求，所以只能使用第三方库

### 3. 使用vue-resource发送跨域请求

#### 3.1 安装vue-resource并引入
    cnpm install vue-resource -S

#### 3.2 基本用法
    使用this.$http发送请求
        this.$http.get(url, [options])
        this.$http.head(url, [options])
        this.$http.delete(url, [options])
        this.$http.jsonp(url, [options])
        this.$http.post(url, [body], [options])
        this.$http.put(url, [body], [options])
        this.$http.patch(url, [body], [options])

## 二、过渡和动画
### 1.过渡
  + 使用场合
    - v-if
    - v-show
    - 动态组件
    - 组件根节点
  + 使用方法

    使用transition组件实现
    - 动画类名（6种）
    - 钩子函数（8种）
    - 第三方动画库的用法
      - 自定义过渡样式类名(6种) + 第三方库中的动画名
      
      ```
       <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="show">hello</p>
      </transition>
      ```
      - 多元素动画
      使用transition-group包含多个元素，并设置不同的key值
      
      ```
        <transition-group name='fade'>
             <p class='trans' v-show='flag' :key='1'></p>
             <p class='trans' v-show='flag' :key='2'></p>
        </transition-group>
      ```
### 2.动画
     用法与过渡相同

## 三、 vue-router路由

### 1. 简介
  下载路由组件
  [参考](https://router.vuejs.org/zh-cn)

    cnpm install vue-router -S

### 2. 基本用法
  + 页面布局

      - router-link
      - router-view

      ```
      <div>
      <router-link to="/home">主页</router-link>
      <router-link to="/user">用户</router-link>
      </div>
      <div>
          <router-view></router-view>
      </div>
      ```
  + 配置路由
    - 路由设置
    - 路由实例
      - mode
      - history
      - linkActiveClass
    - 路由注入

      ```
      var Home = {template:'<h1>我是首页</h1>'}
      var News = {template:'<h1>我是新闻</h1>'}
      //1.配置路由
      const routes = [
        {path:'/home',component:Home},
        {path:'/news',component:News}
      ]
      //2.路由实例
      const router = new VueRouter({
        routes:routes,
        mode:'history',
        linkActiveClass:'active'
      })
      //3.注入路由
      new Vue({
        el:'#d1',
        router:router
      })
      ```

### 3. 路由嵌套和参数传递
    传参的两种形式：
        a.查询字符串：login?name=tom&pwd=123
            {{$route.query}}
        b.rest风格url：regist/alice/456,path指定路由参数名和位置
            {{$route.params}}

  ```
var Login={
     template:'<h4>用户登陆。。。获取参数：{{$route.query}},{{$route.path}}</h4>'
    }
var Regist={
    template:'<h4>用户注册。。。获取参数：{{$route.params}},{{$route.path}}</h4>'
    }
  ```

### 4. 路由实例的方法
```
<script>
  import router from './router'
export default {
  name: 'App',
  methods:{
    goPerson() {
    //      router.push('/home');
    //router.push()  添加路由，功能上与<route-link>相同
    //router.replace() 替换路由，不产生历史记录
    router.push({ name: 'person', params: { id: 66666 }})
    }
  }
}
    
```
### 5. 路由结合动画


## 四、 单文件组件

### 1. .vue文件
    .vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js

    .vue文件由三部分组成：<template>、<style>、<script>
        <template>
            html
        </template>

        <style>
            css
        </style>

        <script>
            js
        </script>

### 2. vue-loader
    浏览器本身并不认为.vue文件，所以必须对.vue文件进行加载解析，此时需要vue-loader
    类似的loader还有许多，如：html-loader、css-loader、style-loader、babel-loader等
    需要注意的是vue-loader是基于webpack的

### 3. webpack
    webpack是一个前端资源模板化加载器和打包工具，它能够把各种资源都作为模块来使用和处理
    实际上，webpack是通过不同的loader将这些资源加载后打包，然后输出打包后文件
    简单来说，webpack就是一个模块加载器，所有资源都可以作为模块来加载，最后打包输出

    [官网](http://webpack.github.io/)

    webpack版本：v1.x v2.x

    webpack有一个核心配置文件：webpack.config.js，必须放在项目根目录下

### 4. 示例，步骤：

#### 4.1 创建项目，目录结构 如下：
webpack-demo
    |-index.html
    |-main.js   入口文件
    |-App.vue   vue文件
    |-package.json  工程文件
    |-webpack.config.js  webpack配置文件
    |-.babelrc   Babel配置文件

### 4.2 编写App.vue

### 4.3 安装相关模板
    cnpm install vue -S

    cnpm install webpack -D
    cnpm install webpack-dev-server -D

    cnpm install vue-loader -D
    cnpm install vue-html-loader -D
    cnpm install css-loader -D
    cnpm install vue-style-loader -D
    cnpm install file-loader -D

    cnpm install babel-loader -D
    cnpm install babel-core -D
    cnpm install babel-preset-env -D  //根据配置的运行环境自动启用需要的babel插件
    cnpm install vue-template-compiler -D //预编译模板

    合并：cnpm install -D webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader file-loader babel-loader babel-core babel-preset-env  vue-template-compiler

### 4.4 编写main.js

### 4.5 编写webpack.config.js

### 4.6 编写.babelrc

### 4.7 编写package.json

### 4.8 运行测试
    npm run dev


## 五、 vue-cli脚手架

### 1. 简介
    vue-cli是一个vue脚手架，可以快速构造项目结构
    vue-cli本身集成了多种项目模板：
        simple  很少简单
        webpack 包含ESLint代码规范检查和unit单元测试等
        webpack-simple 没有代码规范检查和单元测试
        browserify 使用的也比较多
        browserify-simple

### 2. 示例，步骤：

#### 2.1 安装vue-cli，配置vue命令环境
    cnpm install vue-cli -g
    vue --version
    vue list

#### 2.2 初始化项目，生成项目模板
    语法：vue init 模板名  项目名

#### 2.3 进入生成的项目目录，安装模块包
    cd vue-cli-demo
    cnpm install

#### 2.4 运行
    npm run dev  //启动测试服务
    npm run build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上

### 3. 使用webpack模板
    vue init webpack vue-cli-demo2

    ESLint是用来统一代码规范和风格的工具，如缩进、空格、符号等，要求比较严格
[官网](http://eslint.org)

    问题Bug：如果版本升级到node 8.0 和 npm 5.0，控制台会报错：
        GET http://localhost:8080/__webpack_hmr net::ERR_INCOMPLETE_CHUNKED_ENCODING
    解决方法：
        a)降低Node版本到7.9或以下
        b)修改build/dev-server.js文件，如下：
            var hotMiddleware = require('webpack-hot-middleware')(compiler, {
              log: () => {},
              heartbeat:2000 //添加此行
            })
        参考：https://github.com/vuejs-templates/webpack/issues/731

## 六、 Elment UI

### 1. 简介
    Element UI是饿了么团队提供的一套基于Vue2.0的组件库，可以快速搭建网站，提高开发效率
        ElementUI  PC
        MintUI 移动端

[官网](http://element.eleme.io/)

### 2. 快速上手

#### 2.1 安装elment ui
    cnpm install element-ui -S

#### 2.2 在main.js中引入并使用组件
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css' //该样式文件需要单独引入
    Vue.use(ElementUI);
    这种方式引入了ElementUI中所有的组件

#### 2.3 在webpack.config.js中添加CSS和字体的加载设置
    CSS样式和字体图标都需要由相应的loader来加载，所以需要style-loader、css-loader

    默认并没有style-loader模块，所以需要单独安装
        cnpm install style-loader --save-dev
  ```
     rules: [
      {
        //CSS样式文件的加载
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        //字体文件的加载
        test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader:'file-loader'
      },
    ]
  ```
#### 2.4 使用less
    <style>中添加lang='less'属性，此时样式按less文件处理
    安装loader，需要两个：less、less-loader
        cnpm install less less-loader -D
    在webpack.config.js中添加loader

#### 2.5 常用组件
  + 布局（24栅格）
  + 图标
  + 表单元素
  + 上传文件
  + 。。。


### 3. 按需引入组件

#### 3.1 安装babel-plugin-component
    cnpm install babel-plugin-component -D

#### 3.2 配置.babelrc文件
    "plugins": [["component", [
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-default"
        }
    ]]]

#### 3.3  只引入需要的插件

## 七、自定义插件
### 1.插件（全局组件）是指可以在main.js中使用use方法进行全局引入的组件，如vue-router
### 2.插件的自定义方法
    + 创建普通组件
    + 创建js文件，引用该组件
    + 导出时，提供install方法
      ```
      import Login from './Login.vue'
      export default{
        install:function(Vue){
            Vue.component('Login',Login)
        }
      }
      ```
    + main.js中加载并调用Vue.use方法使用该插件

## 八、 Vuex

### 1. 简介
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
    简单来说，用来集中管理数据，类似于React中的Redux，都是基于Flux的前端状态管理框架

### 2. 基本用法

#### 2.1 安装vuex
    cnpm install vuex -S

#### 2.2 创建store.js文件，在main.js中导入并配置store.选项
  ```
  import store from './store.js'

    new Vue({
      el: '#app',
      store,
      render: h => h(App)
    })

  ```

#### 2.3 编辑store.js文件
    Vuex的核心是Store(仓库)，相当于是一个容器，一个store实例中包含以下属性的方法：
        state       定义属性（状态、数据）
        getters     用来获取属性
        actions     定义方法（动作）
        commit      提交变化，修改数据的唯一方式就是显式的提交mutations
        mutations   定义变化
        注：不能直接修改数据，必须显式提交变化，目的是为了追踪到状态的变化

  ```
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex);

    //定义属性（数据）
    var state={
        count:6
    }

    //定义getters
    var getters={
        count(state){
            return state.count;
        },
        isEvenOrOdd(state){
            return state.count%2==0?'偶数':'奇数';
        }
    }

    //定义actions，要执行的操作，如流程判断、异步请求等
    const actions = {
        increment(context){//包含：commit、dispatch、state
            console.log(context);
            // context.commmit()
        },
        // increment({commit,state}){
        //  commit('increment'); //提交一个名为increment的变化，名称可自定义，可以认为是类型名
        // },
        decrement({commit,state}){
            if(state.count>10){
                commit('decrement');
            }
        },
        incrementAsync({commit,state}){
            //异步操作
            var p=new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve();
                },3000);
            });

            p.then(() => {
                commit('increment');
            }).catch(() => {
                console.log('异步操作');
            });
        }
    }

    //定义mutations，处理状态（数据）的改变
    const mutations={
        increment(state){
            state.count++;
        },
        decrement(state){
            state.count--;
        }
    }

    //创建store对象
    const store=new Vuex.Store({
        state,
        getters,
        actions,
        mutations
    })

    //导出store对象
    export default store;
  ```
#### 2.4 编辑App.vue
    在子组件中访问store对象的两种方式：
        方式1：通过this.$store访问
        方式2：通过mapState、mapGetters、mapActions访问，vuex提供了两个方法：
            mapState    获取state
            mapGetters  获取getters
            mapActions  获取actions
  ```
  <script>
    import {mapState,mapGetters,mapActions} from 'vuex'

    export default {
      name: 'app',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      //方式1：通过this.$store访问
      /*computed:{
        count(){
          return this.$store.state.count;
        }
      }*/
      /*computed:mapState([
        'count'
      ]),*/
      computed:mapGetters([
          'count',
          'isEvenOrOdd'
      ]),
      methods:mapActions([
          'increment',
          'decrement',
          'incrementAsync'
      ])
    }
    </script>

  ```



### 3. 分模块组织Vuex

    |-src
        |-store
            |-index.js
            |-getters.js
            |-actions.js
            |-mutations.js
            |-modules  //分为多个模块，每个模块都可以拥有自己的state、getters、actions、mutations
                |-user.js
                |-cart.js
                |-goods.js
                |....




