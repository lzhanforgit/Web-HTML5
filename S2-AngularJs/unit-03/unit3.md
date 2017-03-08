### 内置指令

1. 基础内置指令

      ng-href

      ng-src

      ng-disabled

      ng-checked

      ng-readonly

      ng-selected

      ng-class

      ng-style

      ng-include

      ng-switch

      ng-repeat

      ng-view

      ng-controller

      ng-if

      ng-show

      ng-hide

      ng-change

      ng-form

      ng-click

      ng-select

      ng-class


    ```
        //disabled
        <button ng-disabled="isDisable">click me</button>
    ```

    ```
        //注意这里的 ng-model="isTwoFish" 绑定就是value
        <input type="checkbox"
                       ng-model="isTwoFish"><br/>
        <select>
            <option>One Fish</option>
            <option ng-selected="isTwoFish">Two Fish</option>
        </select>
    ```
    ```
        <a ng-href="{{ myHref }}">I'm feeling lucky, when I load</a>
    ```
    >angularjs建议使用ng-href,ng-src代替href,src。angular会等到插值生成之后才执行
    跳转功能。

2. 指令作用域

    ```
        <div ng-controller="SomeController">
            {{ someBareValue }}
            <button ng-click="someAction()">Communicate to child</button>
            <div ng-controller="ChildController">
                {{ someBareValue }}
                <button ng-click="childAction()">Communicate to parent</button>
            </div>
        </div>
        <script>
            angular.module('myApp', [])
                .controller('SomeController', function($scope) {
                    $scope.someBareValue = 'hello computer';
                    $scope.someAction = function() {
                        $scope.someBareValue = 'hello human, from parent';
                    };
                })
                .controller('ChildController', function($scope) {
                    $scope.childAction = function() {
                        $scope.someBareValue = '哈哈哈';
                    };
                });
        </script>
    ```
    以上说明子作用域只是复制了一份someBareValue，而不是拷贝。

    ```
         angular.module('myApp', [])
                .controller('SomeController', function($scope) {
                    $scope.someBareValue = {data:'hello computer'};
                    $scope.someAction = function() {
                        $scope.someBareValue.data = 'hello human, from parent';
                    };
                })
                .controller('ChildController', function($scope) {
                    $scope.childAction = function() {
                        $scope.someBareValue.data = '哈哈哈';
                    };
                });
    ```
    以上说明子作用域是复制了一份someBareValue对象的引用。

3. ng-switch

    ```
     <input type="text" ng-model="person.name"/>
        <div ng-switch on="person.name">
            <p ng-switch-default>And the winner is</p>
            <h1 ng-switch-when="Ari">{{ person.name }}</h1>
        </div>
    ```

4. ng-repeat

      $index:  (0...length-1)。
      $first:
      $middle:
      $even:   偶数时返回true
      $odd:

    ```
    <ul ng-controller="PeopleController">
    <li ng-repeat="person in people" ng-class="{even: !$even, odd: !$odd}">
                 {{person.name}} lives in {{person.city}}
             </li>
    </ul>
         .odd {
             background-color: blue;
    } .even {
             background-color: red;
         }
         angular.module('myApp',[])
         .controller('PeopleController',function($scope) {
             $scope.people = [
                 {name: "Ari", city: "San Francisco"},
                 {name: "Erik", city: "Seattle"}
    ]; });

    ```

5. ng-form

    ```
        code: code/3-ngform-1.html
    ```

6. ng-select

    ```
    <div ng-controller="CityController">
        <select ng-model="city"
                ng-options="city.name for city in cities">
            <option value="">Choose City</option>
        </select>
        Best City: {{ city.name }}
    </div>

    <script>
        angular.module('myApp',[])
            .controller('CityController',function($scope) {
                $scope.cities = [
                    {name: 'Seattle'},
                    {name: 'San Francisco'},
                    {name: 'Chicago'},
                    {name: 'New York'},
                    {name: 'Boston'}
                ]; });
    </script>
    ```

7. ng-class

    >动态设置元素的类，先绑定一个代表所有需要添加类的表达式，当表达式发生变化，新类添加、旧类
    会被移除。

    ```
    <div ng-controller="LotteryController">
        <div ng-class="{red: x > 5}"
             ng-if="x > 5">
            You won!
        </div>
        <button ng-click="x = generateNumber()"
                ng-init="x = 0">
            Draw Number
        </button>
        <p>Number is: {{ x }}</p>
    </div>

    <script>
        angular.module('myApp',[])
            .controller('LotteryController', function($scope) {
                $scope.generateNumber = function() {
                    return Math.floor((Math.random()*10)+1);
                }; });
    </script>
    ```

###多重视图和路由

1. 安装

    ```
    $bower install--save angular -route

    //引用

    <script src="js/vendor/angular.js"></script>
    <script src="js/vendor/angular-route.js"></script>

    angular.module('myApp', ['ngRoute']);
    ```
2. 布局模板

    ```
    <div ng-view></div>
    ```

    >ng-view是路由模块提供的一个特殊指令，他的作用是给$route对应的视图内容
    占位。他是一个优先级为1000的终极指令，不会允许div标签上的其他指令。