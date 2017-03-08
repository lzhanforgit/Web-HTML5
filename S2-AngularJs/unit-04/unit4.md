### 服务

1. 为什么需要服务

    控制器只会在需要时实例化，不需要马上会被销毁。所以当路由不停切换时，这种
    实例化和销毁会很浪费内存。

    服务提供了一种能在整个应用生命周期内保存数据的方法，他能在各个控制器之间
    进行通信，并且保证数据的一致性。

    服务是一个单例对象，每个应用中只会被$injector实例化一次，而且是延迟加载
    （需要的时候才加载）。

    共有五中方式来注册服务

    factory()

    service()

    constant()

    value()

    provider()

2. 服务的注册与使用

    示例

    ```
        angular.module('myApp', []) .factory('UserService', function($http) {
                 var current_user;
                 return {
                     getCurrentUser: function() {
                         return current_user;
                     },
                     setCurrentUser: function(user) {
                         current_user = user;
                    }};
        });
    ```
    >工厂函数用来生成一个单例的函数或者对象，这个对象或者函数就是服务。他会存在于应用的整个生命
    周期内，当angularjs应用加载服务时，这个工厂函数会被执行并返回一个单例的服务对象。

    服务中也可以通过显示注入其他服务,如$http

    ```
        angular.module('myApp.services', []) .factory('UserService',['$http', function($http) {
                 var current_user;
                 return {
                     getCurrentUser: function() {
                         return current_user;
                     },
                     setCurrentUser: function(user) {
                         current_user = user;
                    }};
        }]);
    ```

    使用服务

    ```
        angular.module('myApp', ['myApp.services']) // 导入模块（module）
        .controller('ServiceController', function($scope, UserService) { //注入服务
                 $scope.user = UserService.getCurrentUser; //使用服务

        });
    ```

    <h5>**下面代码作用是：绑定一个username，当username值发生变化时，由$watch来观察他们的变化
    ，但是为了在文本框输入完成后才启动调用service，所以加了$timeout</h5>


    ```
        app.controller('ServiceController', function($scope, $timeout, githubService) {
            var timeout;
            $scope.$watch('username', function(newUserName) {
                 if (newUserName) {
                    if (timeout) $timeout.cancel(timeout);
                        timeout = $timeout(function() {
                        }, 350);
                 }
                    });
        });
    ```

    <h4 stype="color:red">服务可以用来在控制器之间传递数据，因为服务存在于应用的整个生命
    周期内,并且是单例模式，所以我们可以把数据（比如登录状态、用户ID等）存在服务中，各个页面共享</h4>

    ```
            angular.module('myApp.services', []) .factory('UserService',['$http', function($http) {
                     var current_user;
                     return {
                         getCurrentUser: function() {
                             return current_user;
                         },
                         setCurrentUser: function(user) {
                             current_user = user;
                        }};
            }]);

    ```
3. factory()

    >需要两个参数，name和fn,fn函数会在创建服务实例时被调用，而且只会调用一次（单例模式）。

    ```
    angular.module('myApp')
    .factory('myService', function() {

       };
    });
    ```

4. service()

