# Vue.js

###一、 Vue.js简介

1. Vue.js是什么

	

  **Vue.js**也称为Vue，读音/vju:/，类似view
  版本：v1.0（2014） v2.0（2016）

  + 是一个构建用户界面的框架
  + 是一个轻量级MVVM（Model-View-ViewModel）框架，和angular、react类似
  + 数据驱动+组件化的前端开发（核心思想）
  + 通过简单的API实现**响应式的数据绑定**和**组合的视图组件**
  + 更容易上手、小巧

  参考：[中文官网](https://cn.vuejs.org/)


2. 安装

	 下载核心库vue.js(版本 v2.5.13 目前最新版本2017.12.20)
  	+ 直接通过script引入
  
		  	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
		  		
		  	<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  
  	+ 通过npm安装

  			npm install vue --save
  + 命令行工具（CLI），后续介绍

2. 安装vue-devtools插件(记得要翻墙...)，便于在chrome中调试vue

	[地址](https://github.com/vuejs/vue-devtools#vue-devtools)
	
	直接将vue-devtools解压缩，然后将文件夹中的chrome拖放到扩展程序中

	    //配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false
	        Vue.config.devtools=false;
	        Vue.config.productionTip=false; //阻止vue启动时生成生产消息


## 二、 基本功能简介
#### 1. 声明式渲染，将数据渲染进DOM系统
    js:
        new Vue({
            el:'#itany', //指定关联的选择器,不支持body，html
            data:{ //存储数据
                msg:'Hello World',
                name:'tom'
            }
        });
    html:
        <div id="itany">
            {{msg}} <!--显示vue中的数据-->
        </div>

### 2. 条件与循环
  + v-if
    通过布尔值用来显示或隐藏元素

  ```
  <div id="app-3">
    <p v-if="seen">现在你看到我了</p>
  </div>
  var app3 = new Vue({
      el: '#app-3',
      data: {
        seen: true
      }
    })
  ```
  + v-for
    
    对数组或对象进行循环操作
    
    ```
    <div v-for="item in items">
        {{ item.text }}
    </div>
    ```

### 3. 处理用户输入
  + v-model
    双向数据绑定，一般用于表单元素
    
    ```
    <div id="mydiv">
        姓名:<input type="text" name="" v-model='name'>
        {{name}}
    </div>
    ```
  + v-on
    用来绑定事件，用法：v-on:事件="函数"
   
    ```
    <!-- 方法处理器 -->
    <div id="app-5">
      <p>{{ message }}</p>
      <button v-on:click="reverseMessage">逆转消息</button>
    </div>

    var app5 = new Vue({
    el: '#app-5',
    data: {
      message: 'Hello Vue.js!'
      },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
      }
    })
    ```

### 4. 组件化应用

   组件（Component）是 Vue.js最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码

  + 定义组件

  ```
  // 定义名为 todo-item 的新组件
    Vue.component('todo-item', {
      template: '<li>这是个待办项</li>'
    })
  ```
  + 使用组件

  ```
    <ol>
      <!-- 创建一个 todo-item 组件的实例 -->
      <todo-item></todo-item>
    </ol>
  ```
  + 组件高级应用（后续介绍）

## 四、 Vue实例

### 1. 创建实例
  + 每个Vue应用都是通过Vue函数创建的实例开始的

  ```
  var vm = new Vue({
  // 选项
  })
  ```
  + 每个Vue应用通过一个根实例，以及可选的组件树组成


### 2.数据和方法
  + 数据
    - 实例的data对象保存数据。当数据改变时，视图会重新渲染。但只有实例创建时data中存在的数据才是响应式的

    - 实例属性

      $data

      $el

      $ref
      
      		var app=new Vue({
      	  el:'#app',
      	  data:{
      	      content:"hello world",
      	      jobs:[
      	          {"id":"001","title":"python工程师"},
      	          {"id":"002","title":"web工程师"},
      	          {"id":"003","title":"测试工程师"},
      	      ]
      	  },
      	  methods:{
      	      show:function () {
      	          alert('ok')
	
      	      }
      	  }
        	})
        	
        	app.$data.content='hello china'


  + 方法

    通过methods对象保存方法
    - 实例方法

      vm.$set(object,key,value)

      vm.$delete(object,key)

      vm.$watch(data,callback[,options])（监听器的实例方法，后续介绍侦听器的选项设置）

### 3.生命周期
  vue实例从创建到销毁的过程，称为生命周期，共有八个阶段

  + beforeCreate
  + created
  + beforeMount
  + mounted
  + beforeUpdate
  + updated
  + beforeDestory
  + destoryed

https://segmentfault.com/a/1190000011381906?utm_source=tag-newest


## 五、 模板语法

### 1. 插值
Vue.js使用基于HTML的模板语法，可以将DOM绑定到Vue实例中的数据
  + 文本
    使用Mustache语法，即{{}}
    ```
    <p>Using mustaches: {{ rawHtml }}</p>
    只会赋值一次，之后就不再绑定
    <h1 v-once>{{message}}</h1>
    ```
  + 原始HTML
    使用 v-html v-text

    ```
    <p>Using v-html directive: <span v-html="'welcome to:'+rawHtml"></span></p>
    <h1 v-text="'welcome to:'+message"></h1>
    ```
  + 属性
    Mustache 语法不能作用在HTML属性上,需要使用v-bind
    
    ```
    <div v-bind:id="dynamicId"></div>
    ```
  + 使用Javascript表达式
    针对属性键值，可以使用Javascript表达式
    
    ```
    {{ number + 1 }}

    {{ ok ? 'YES' : 'NO' }}

    {{ message.split('').reverse().join('') }}

    <div v-bind:id="'list-' + id"></div>
    ```

### 2. 指令
    指令 (Directives) 是带有 v- 前缀的特殊属性
  + 参数
    一些指令能够接收一个“参数”，在指令名称之后以冒号表示。
    
    ```
    <a v-bind:href="url">...</a>

    <a v-on:click="doSomething">...</a>
    ```
  + 修饰符
    修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定

  + 缩写

    v-bind -> @

    v-on -> :

## 六、计算属性和侦听器

### 1. 基本用法
    计算属性也是用来存储数据，但具有以下几个特点：
        a.数据可以进行逻辑处理操作
        b.对计算属性中的数据进行监视
  ```
  <div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
  var vm = new Vue({
    el: '#example',
    data: {
      message: 'Hello'
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
      }
    }
  })
  ```
3. 计算属性

    模板内的表达式是非常便利的，但是它们实际上是用于简单运算的。
    在模板中放入太多的逻辑会让模板过重且难以维护。

    ```
    <div id="example">
      <p>Original message: "{{ message }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
    ```


    var vm = new Vue({
      el: '#example',
      data: {
        message: 'Hello'
      },
      computed: {
        // a computed getter
        reversedMessage: function () {
          // `this` points to the vm instance
          return this.message.split('').reverse().join('')
        }
      }
    })


    ```
    
    计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
    
    ```
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
    ```
4. 观察者

    ```
    computed:{
                rever_content:function () {
                    return this.content_else.split('').reverse().join('');
                },
                fullname:function () {
                    return this.firstname+' '+this.lastname
                }
            },
    watch: {
                firstname: function (val) {
                    this.fullname = val + ' ' + this.lastname
                },
                lastname: function (val) {
                    this.fullname = this.firstname + ' ' + val
                }
            }
    ```

### 2.计算属性 vs 方法
    将计算属性的get函数定义为一个方法也可以实现类似的功能
    区别：
        a.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化
        b.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行

### 3. get和set
    计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性
    默认只有get，如果需要set，要自己添加
    
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }


### 4.侦听器
  Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

  + 普通监测

  ```
  var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
  }
})
  ```
  + 深度监测

  	1. 第一个handler：其值是一个回调函数。即监听到变化时应该执行的函数。
	2. 第二个是deep：其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。）
	3. 第三个是immediate：其值是true或false；确认是否以当前的初始值执行handler的函数。



  ```
  watch: {
    // 深度 watcher
    c: {
      handler: function (val) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      function handle1 (val, oldVal) { /* ... */ },
      function handle2 (val, oldVal) { /* ... */ }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
  ```

## 七. 过滤器
过滤器主要用于一些常见的文本格式化,Vue1.0提供了内置过滤器，2.0全部废弃。
### 1.全局过滤器
所有Vue实例对象都可以使用,但是注意一定要置于VUE构建对象之前

  ```
Vue.filter('过滤器名'，(data[,参数]) =>{
   return 结果；
})
  ```

  例如

```
	Vue.filter('more',function (data,len) {
            if (!data)
                return ''
            data = data.toString()
            return data.substr(0,len)+'...';
        })
        
    //调用
    
    <h1>{{input_content|more(20)}}</h1>
```
### 2.局部过滤器
指定的Vue实例对象可以使用

```
data:{
   
},
filters:{
      过滤器名:(data[ ,参数]) = > {
         return  结果
      }
    }
```



### 3.过滤器的使用
在插值中或v-bind中可以使用，通过“|”实现文本格式化

  {{变量  |  过滤器名[（参数）]}}

## 八. 样式绑定

### 1.class样式绑定
  使用属性绑定class时，不能直接使用类样式名，可以采用三种方式实现
    - 使用变量，把类样式名赋值给变量
    - 使用数组，同时使用多个类样式变量
    
    ```
    <div v-bind:class="[activeClass, errorClass]"></div>
    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
    ```
    - 使用JSON数据，{类样式：bool}
    ```
     <p :class='{clsNamea:false,clsNameb:true}'>hello</p>
    ```

### 2.style样式绑定
    - 使用变量
    
    ```
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    data: {
      activeColor: 'red',
      fontSize: 30
    }
    ```
    - 使用数组
    ```
    <div v-bind:style="[baseStyles, overridingStyles]"></div>
    ```
    - 使用对象
    ```
    <div v-bind:style="styleObject"></div>
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
    ```

## 九、 条件渲染
### 1.v-if
  + v-if

  ```
  <h1 v-if="ok">Yes</h1>
  ```
  + v-else
    必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
   
    ```
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>
    ```

  + v-else-if
    充当 v-if 的“else-if 块”，可以连续使用：
    
    ```
    div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    ```

  + 用key管理可复用的元素
    Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染
    
    ```
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address">
    </template>
    ```

### 2.v-show
  带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

  ```
  <h1 v-show="ok">Hello!</h1>
  ```

### 3.v-if和v-show区别
  + v-if是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

  + v-show是不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

## 十、列表渲染
### 1. 基本语法
  v-for指令根据一组数组的选项列表进行渲染。需要使用 item in items 形式的特殊语法，items 是源数据,item 是数组元素迭代的别名,可以使用of替换in。

### 2.常见数据源
   + 数组
     - 单参数
      
     ```
        <ul id="example-1">
          <li v-for="item in items">
            {{ item.message }}
          </li>
        </ul>
     ```
     - 两个参数
     
     ```
        <li v-for="(item, index) in items">
          {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>
     ```
   + 对象
     - 单参数
     
     ```
        <ul id="example-1">
          <li v-for="value in object">
            {{ value }}
          </li>
        </ul>
     ```
     - 两个参数
     
     ```
        <div v-for="(value, key) in object">
          {{ key }}: {{ value }}
        </div>
     ```
     - 三个参数
     
      ```
        <div v-for="(value, key, index) in object">
          {{ index }}. {{ key }}: {{ value }}
        </div>
      ```
     - key的应用
     
     ```
     <div v-for="item in items" :key="item.id">
        <!-- 内容 -->
     </div>
     ```

## 十一、 事件处理

### 1. 监听事件

#### 1.1 事件监听和处理方法
    v-on:click=""
    简写方式 @click=""
    
    var app5 = new Vue({
      el: '#app-5',
      data: {
        message: 'Hello Vue.js!'
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('')
        }
      }
    })

#### 1.2 事件对象$event
    包含事件相关信息，如事件源、事件类型、偏移量（target、type、offsetx）

#### 1.3 事件修饰符
  + 阻止事件冒泡：
        a)原生js方式，依赖于事件对象，event.stopPropagation()
        b)vue方式，不依赖于事件对象

        <!-- 阻止单击事件继续传播 -->
        <a v-on:click.stop="doThis"></a>


  + 阻止默认行为：
        a)原生js方式，依赖于事件对象，event.preventDefault()
        b)vue方式，不依赖于事件对象

        <!-- 阻止单击默认行为 -->
        <a v-on:click.prevent="doThis"></a>

  + 只执行一次：
    ```
      <!-- 点击事件将只会触发一次 -->
      <a v-on:click.once="doThis"></a>
    ```


#### 1.4 按键修饰符
    回车：@keydown.13 或@keydown.enter
    向上：@keydown.38 或@keydown.up
    
    默认没有@keydown.a/b/c...事件，可以自定义键盘事件，也称为自定义键码或自定义键位别名
    Vue.config.keyCodes.f1 = 112

#### 1.5 系统修饰键
    .ctrl
    
    .alt
    
    .shift


## 十二、表单输入绑定
### 1、基础用法
使用v-model指令在表单元素&lt;input&gt;、&lt;textarea&gt;上创建双向数据绑定

  + 单行文本

  ```
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>
  ```
  + 多行文本

  ```
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <br>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
  ```
  + 复选框

  ```
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>
  ```
  + 单选按钮

  ```
  <div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
  </div>
  ```
  + 选择框

  ```
  <div id="example-5">
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>
  </div>
  ```



























































