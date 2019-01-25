/**
 * Created by lzhan on 16/9/21.
 */
var app = angular.module('module_login', ['ngAnimate']);//ngAnimate 动画模块
app.service('ser_display',function () {
    this.show=function (x) {
        return console.log(x);
    }
});
app.controller('login_controller', function($scope,$http,$location,$timeout,ser_display) {

//            所赋的value必须满足表单的验证规则
//     $scope.email= 'lzhan@999.com';
//     $scope.password= "Doe";
    $scope.cities=['jiangsu','anhui','suzhou'];
    $scope.isHide=true;
    $scope._result='用户名或密码错误';
   $scope.login=function () {
       $http({
           method  : 'POST',
           url     : '/login',
           data    :{email:$scope.user_email,password:$scope.user_password},
           headers : { 'Content-Type': 'application/json;charset=utf-8' }  // set the headers so angular passing info as form data (not request payload)
       })
           .success(function(data) {
               console.log(data.result);
               // $location.absUrl();
               // console.log($location.path());
               // ser_display.show('haha');
               if(data.result===0){
                   $scope.isHide=false;

               }
           });
   }
});