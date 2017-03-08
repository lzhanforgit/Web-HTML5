/**
 * Created by lzhan on 2017/1/16.
 */
var app = angular.module('NewsPub');
function routeConfig($routeProvider){
    $routeProvider.
    when('/', {
        controller: 'ListController',
        templateUrl: './list.template.html'
    }).
    when('/detail/:id', {
        controller: 'DetailController',
        templateUrl: 'detail.html'
    }).
    when('/edit/:id', {
        controller: 'EditController',
        templateUrl: 'edit.html'
    }).
    when('/list', {
        controller: 'ListController',
        templateUrl: 'list.html'
    }).
    when('/add', {
        controller: 'AddController',
        templateUrl: 'add.html'
    }).
    otherwise({
        redirectTo: '/'
    });
};

app.config(routeConfig);

var newsList = [{
    id : 1,
    title : 'title 1111',
    content : 'content 1111111',
    date : new Date()
},{
    id : 2,
    title : 'title 2222',
    content : 'content 2222222',
    date : new Date()
},{
    id : 3,
    title : 'title 3333',
    content : 'content 3333333',
    date : new Date()
},{
    id : 4,
    title : 'title 4444',
    content : 'content 4444444',
    date : new Date()
},{
    id : 3,
    title : 'title 5555',
    content : 'content 5555555',
    date : new Date()
},{
    id : 3,
    title : 'title 6666',
    content : 'content 6666666',
    date : new Date()
},{
    id : 3,
    title : 'title 7777',
    content : 'content 7777777',
    date : new Date()
}];

app.controller('ListController',['$scope','newsTitleService',function($scope,newsTitleService){
    console.log('here'+newsTitleService.newsTitle);
    $scope.newsList = newsList;
}]);

app.controller('DetailController',function($scope, $routeParams){
    $scope.news = newsList[$routeParams.id-1];
});

app.controller('AddController',function($scope,$location){
    $scope.title = '';
    $scope.content = '';
    $scope.add = function(){
        newsList.push({
            id : newsList.length+1,
            title : $scope.title,
            content : $scope.content,
            date : new Date()
        });

        $location.path('list');
    }
});

app.controller('EditController',function($scope, $routeParams, $location){
    $scope.news = newsList[$routeParams.id-1];
    $scope.update = function(){
        newsList[$routeParams.id-1] = $scope.news;

        $location.path('list');
    }
})
