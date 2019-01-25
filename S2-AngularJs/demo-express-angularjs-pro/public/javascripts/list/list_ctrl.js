/**
 * Created by lzhan on 16/9/21.
 */
var app = angular.module('module_list', []);

app.controller('list_controller', ['$scope','$http','$location','$timeout',function($scope,$http,$location,$timeout) {
    $scope.cities=['jiangsu','anhui','suzhou'];
    $scope.data='我是来自list控制器中的变量data';
}]);