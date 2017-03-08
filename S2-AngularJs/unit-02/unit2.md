unit2
==
1. 过滤器
    >过滤器（filter）正如其名，作用就是接收一个输入，通过某个规则进行处理，然后返回处理后的结果。
    主要用在数据的格式化上，例如获取一个数组中的子集，对数组中的元素进行排序等。
    ng内置了一些过滤器，它们是：currency(货币)、date(日期)、filter(子串匹配)、
    json(格式化json对象)、limitTo(限制个数)、lowercase(小写)、uppercase(大写)、number(数字)、orderBy(排序)。总共九种。除此之外还可以自定义过滤器，这个就强大了，可以满足任何要求的数据处理。

    1. filter

        ~~~
        //根据搜索框输入过滤所有字段
         <tr ng-repeat="res in result  | orderBy:col:desc  |filter:txtSearch">

        //根据搜索框输入过滤特定字段
          <tr ng-repeat="res in result  | orderBy:col:desc  |filter:{name:txtSearch}">
        //过滤特定几个字段怎么办呢？

        ~~~

        控制中使用过滤器

        ```
        $scope.result[0].name=$filter('uppercase')($scope.result[0].name);
        ```
    2. limitTo


    3. orderby


    3. 分页效果

        ```
        <li ng-repeat="sentences in demoLists[0].name | paging:currentPage*listsPerPage | limitTo:listsPerPage">{{sentences}}</li>  <!-- ng-repeat 动态生成模拟的数据 -->
        ```

    4. 自定义过滤器


        ```

         <td>{{res.name | toUpper |limitTo:3}}</td>

         app.filter('toUpper',function () {
                    return function (input) {
                        return input[0].toUpperCase()+input.slice(1);
                    }
         })


        ```

        ```
        app.filter('paging',function(){      //paging 过滤器
                    return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
                             return lists.slice((start-1)*3,start*3);     //将原始数据按照 start 分割
                           };
                     });
        ```

2. 表单验证-ngMessages

    安装

    ```
    $ bower install --save angular-messages
    ```
    code:
    ```
        unit-02/code/4-ngmessages.html

    ```
    使用模板

    ```
        <div ng-messages="signup_form.name.$error">
            <ng-messages-include src="error-template.html"></ng-messages-include>
        </div>

    ```
3. 指令

    本质上就是angularjs扩展具有自定义功能的html元素的途径
    ==

    >内置指令是打包在angularjs内部的指令，所有内置指令的命名空间都使用
    ng作为前缀，为了防止命名空间冲突，不要在自定义指令前加ng前缀。

    指令通常不会创建自己的$scope，但是ng-controller和ng-repeat除外。他们两会
    创建自己的子作用域并将它附加到DOM元素上.
   （详情见："unit-01/code/3-4-ngcontrollerNestind.html"）。

    ~~~
     angular.element().scope()；
    ~~~

    1. 用表达式申明指令

        ```
         <my-directive="someExpression">
         </my-directive>

         <div my-directive="someExpression">
         </div>

         <div class="my-directive:someExpression"> </div>

         <!-- directive: my-directive someExpression -->

        ```
    2. 向指令中传递参数

        ```
            <div ng-app="myApp" >
                <div ng-controller="ctrl_login">
                    <directive-link
                        href-url="www.baidu.com"
                        link-texts="baidu.com"
                    ></directive-link>
                </div>
            </div>
            var app = angular.module('myApp', []);
            app.controller('ctrl_login', function($scope) {

                });
            app.directive("directiveLink", function() {
                return {
                    restrict : "AEM",
                    replace  : true,
                    template : "<a href='{{hrefUrl}}'>{{linkTexts}}</a>"
                };
            });
        ```
        >以上代码超链接文本无法显示，因为div 和 directiveLink不在一个共同的作用域中
        （没有$scope）

        为了解决这样的问题可以采用隔离作用域，这样就意味着directiveLink 有了一个自己
        的$scope

        ```
             scope: {
                     someProperty: '@'
            }
        ```
        @ 是一种绑定策略，这个策略告诉angular将DOM 中some-property属性的值复制给新
        作用域对象中的someProperty属性

        ```
            app.directive("directiveLink", function() {

                    return {
                        restrict : "AEM",
                        replace  : true,
                        scope: {
                            hrefUrl: '@',
                            linkTexts: '@'  },
                        template : "<a href='{{hrefUrl}}'>{{linkTexts}}</a>"
                    };
                });
        ```
        >默认情况下 hrefUrl: '@'映射的是DOM中的href-url，如果想显式制定，可以：

        ```
             hrefUrl: '@myUrl', //映射的是my-url属性
        ```

    3. 向指令中传递参数-ngModel

        ```
            <div ng-app="myApp"  ng-controller="ctrl_login">
                <input type="text" ng-model="linkTexts">
                //ng-model="linkTexts" 和 link-texts="linkTexts"不能绑定，因为link-texts
                //属于隔离作用域（指令的）。
                <div directive-link my-url="www.baidu.com" link-texts="linkTexts">


                </div>

                //放在这个位置可以！！！！
                <p>{{linkTexts}}</p>
            </div>
        ```
    >内置指令ng-model在他自身内部的隔离作用域和DOM的作用域（控制器提供）之间创建了一个双向数据绑定。

    修改

    ```
         return {
                    restrict : "A",
                    replace  : true,
                    scope: {
                        hrefUrl: '@myUrl',
                        linkTexts: '=linkTexts'  }, //here 双向绑定
                    template : "<a href='{{hrefUrl}}'>{{linkTexts}}</a>"
                };
    ```

    ```
        <div ng-app="myApp"  ng-controller="ctrl_login">
            <input type="text" ng-model="linkT">
            <div directive-link my-url="www.baidu.com" link-other="linkT">

            </div>
            {{linkT}}
        </div>

        app.directive("directiveLink", function() {

                return {
                    restrict : "A",
                    replace  : true,
                    scope: {
                        hrefUrl: '@myUrl',
                        linkTexts: '=linkOther'  },
                    template : "<a href='{{hrefUrl}}'>{{linkTexts}}</a>"
                };
        });
    ```