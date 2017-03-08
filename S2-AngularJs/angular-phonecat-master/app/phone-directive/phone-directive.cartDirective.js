/**
 * Created by lzhan on 2016/12/22.
 */
angular.module('phoneCartDirective')
    .directive('phList', function() {
        return {
            restrict: 'AE',
            template:
            '<table class="table table-hover" >'+
            '<tr style="background-color: #cccccc">'+
              '<td>全选</td>'+
              '<td>商品</td>'+
              '<td>单价</td>'+
              '<td>数量</td>'+
              '<td>小计</td>'+
              '<td>操作</td>'+
            '</tr>'+
            '<tr ng-repeat="phone in phones">'+
                '<td >全选</td>'+
                '<td >{{phone.name}}</td>'+
                '<td >{{phone.id}}</td>'+
                '<td >{{phone.android.os}}</td>'+
                '<td>删除</td>'+

            '</tr>'+

         '</table>',
            scope: {},
            require: 'ngModel',
            link: function(scope, iElement, iAttrs, ngModelController) {
                ngModelController.$render = function() {
                    // iElement.find('tr').text(ngModelController.$viewValue);
                   scope.phones=angular.fromJson(ngModelController.$viewValue);
                  console.log(scope.phones);
                };

                function updateModel(offset) {
                    ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                    ngModelController.$render();
                }

                scope.decrement = function() {
                    updateModel(-1);
                };
                scope.increment = function() {
                    updateModel(+1);
                };
            }
        };
    });
