/**
 * Created by lzhan on 2017/1/17.
 */

angular.module('firstApp')
    .run(function ($rootScope) {
        $rootScope.userName = '404';
    })
    .controller('myCtrl1', ['$scope', '$rootScope', function (s1, r) {

        s1.person = {"userName": "div01..."};

    }])
    .controller('myCtrl2', ['$scope', function (s2) {

//            s2.userName='div02....'
        s2.person.userName = 'hahaha';
//            s.userName='div01_user';
//            s.userId='00008';
//
//            var ngInjector = angular.injector(['ng']);
//
//            console.log("ng $rootScope=" + ngInjector.has("$rootScope"));//true
//
//            console.log(app);//true
    }]);
