unit1
=====
1. angularjs

    一个应用中包含太多的脚本，难于维护。而且随着脚本的增加，脚本之间
    会产生依赖关系。所以尽量用一到两种脚本完成开发。

    AngularJs主要构件单页面应用程序，它是一种构建动态Web应用的结构化框架。
2. 数据绑定
    >AngularJs创建模板来代替视图，不是将数据合并进模板之后更新DOM。

    ```
        code/1-helloworld.html
    ```

    >ng-bind是从$scope -> view的单向绑定，也就是说ng-bind是相当于{{object.xxx}}，
    是用于展示数据的。但是{{object.xxx}}会导致内容闪烁（Flash of Unrendered Content，FOUC）
    可以这么写：

    ```
        <div ng-bind="object.xxx"></div>
        //或者
        <div ng-cloak>{{object.xxx}}</div>
        //绑定多个表达式
         <div
             ng-bind-template="{{message}}{{name}}">
         </div>

    ```



    >ng-modle是$scope <-> view的双向绑定.

3. module(ng-app)
    1. 定义模块

            ~~~
                var app = angular.module('firstApp', []);
            ~~~

        ### 系统调用过程

        a. 向angular对象上添加一堆工具函数

        b. 工具函数挂到模块上

            ~~~
                function setupModuleLoader(window) {...
            ~~~
        >所以当定义完module后，系统会为module对象注册上很多的属性和方法。

            ```
                console.log(app);
            ```
        c. 注册ng内核Provider：两个最重要的$parser和$rootScope

            ```
                function publishExternalAPI(angular) {...
            ```
    1. 一个页面会自动加载第一个ng-app

    2. 如果想启动其它ng-app，需要通过手动方法启动(一般没有人这么做)。

    3. 特别注意：手动方法启动一定要放在ready()方法中，或者放在最后。

        ~~~
            //code: code/2-ngapp.html
            angular.element(document).ready(function () {
            //启动两个ng-app
                angular.bootstrap(document,['firstApp','secondApp']);
            })
        ~~~
4. angularjs 内置jquery

    >如果用户手动导入jquery，则使用用户导入的。如果没有则使用内部jqLite

    ```
        function bindJQuery() {...}
        ...
        jqLite(window.document).ready(function() {
            angularInit(window.document, bootstrap);
        });
    ```

5. controller

    1. 一个ng-app可以有多个controller

    2. $scope的范围局限于每一个controller中

        ```
            code/3-ngcontroller.html
        ```
    3. 控制器不适合来执行DOM操作、格式化或数据操作，以及除存储数据模型之外的状态维护操作。
    它只是视图和$scope之间的桥梁。而是通过将复杂的逻辑放到指令或者服务中，通过注入指令和
    服务到控制器来完成。
    4. 控制器可以嵌套

        ```
            <div ng-app="myApp">
                <div ng-controller="myCtrl1">
                    <div id="div02" ng-controller="myCtrl2">
                        <button ng-click="display()">我是谁？？</button>
                    </div>
                </div>

            </div>


            <script>
                var app = angular.module('myApp', []);
                app.controller('myCtrl1',['$scope','$rootScope',function(s,r) {
                    s.person={name:'lzhan'};
                }]);
                app.controller('myCtrl2',['$scope',function(s) {
                    s.display=function () {
                        alert(s.person.name);
                    }
                }]);

            </script>
        ```

6. $scope, $rootScope

    AngularJS 应用组成如下：

    * View(视图), 即 HTML。
    * Model(模型), 当前视图中可用的数据。
    * Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。

    >scope是angularJS中的作用域(其实就是存储数据的地方)，很类似javascript的原型链。
    搜索的时候，优先找自己的scope，如果没有找到就沿着作用域链向上搜索，直至到达根作用域
    rootScope。

    >绝对不要直接将控制器中的$scope赋值为值类型（数字、字符串或者布尔值）,DOM中应该始终
    采用点操作符来访问数据。

    >$rootScope是由angularJS加载模块的时候自动创建的，**每个模块只会有1个rootScope**。
    rootScope创建好会以服务的形式加入到 $injector中。也就是说通过
    $injector.get("$ rootScope ");能够获取到某个模块的根作用域。
    更准确的来说，$rootScope是由angularJS的核心模块ng创建的。

    angular.element('#div02')返回jqueryDOM对象（注意要外部引入jquery，并且置于
    angularjs之前）。

    >angular.element().scope()可以获取到当前元素的scope或父scope。如果当前元素有scope，
    则返回自己的scope;如果没有则向父亲方向寻找,如果找不到返回rootScope。即 返回作用域链上，
    距离该元素最近的scope 。
    ---

    $scope生命周期

    * 创建
        >在创建控制器或指令时。
    * 链接
        >当angulaujs 开始运行时，所有$scope对象都会附加或者链接到视图中（所以当$scope
        发生变化不必更新视图的DOM）。

        >链接完成后，$scope会注册当上下文发生变化时需要的函数，就是$watch().$watch()
        发现变化时，启动事件循环去更新。

    * 更新
        >事件循环发生后，每个$scope都会进行脏值检查，如果发现变化，$scope会触发指定
         的回调函数。

         ```
         <div ng-app="myApp" >
                 <div ng-controller="myCtrl">
                     <input type="text" ng-model="txt_value">
                     value:{{txt_content}}
                 </div>

         </div>

         <script>
             var app = angular.module('myApp', []);
             app.controller('myCtrl', function($scope,$parse) {
                $scope.$watch('txt_value',function (newvalue,oldvalue,scope) {
                    if(newvalue!==oldvalue){
                        var parseFun=$parse('txt_value');
                        $scope.txt_content=parseFun(scope);
                    }
                })
             });

         </script>
         ```

    * 销毁

7. 表达式

    类似于 JavaScript 表达式，AngularJS 表达式可以包含字母，操作符，变量。

    * 与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中。
    * 与 JavaScript 表达式不同，AngularJS 表达式不支持条件判断，循环及异常。
    * 与 JavaScript 表达式不同，AngularJS 表达式支持过滤器。

    插值值表达式

    ```
    <div ng-app="myApp" >
            <div ng-controller="myCtrl">
                <!--在textarea文本中输入{{to}}就可以引用文本框中的内容了-->
                <input type="text" ng-model="emailTo">
                <br>
                <textarea name="email_content" ng-model="emailContent" id="txt_emailContent" cols="30" rows="10">
                </textarea>
                <br>
                邮件预览:
                <br>
                <textarea  ng-bind="previewEmail"  cols="30" rows="10">
                </textarea>
            </div>

    </div>

    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function($scope,$interpolate) {
            $scope.emailTo='lzhan@163.com';
           $scope.$watch('emailContent',function (body) {
               if(body){
                   var template=$interpolate(body);
                   $scope.previewEmail=template({to:$scope.emailTo});
               }
           })
        });

    </script>
    ```

