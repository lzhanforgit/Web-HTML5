/**
 * Created by lzhan on 2017/1/16.
 */
angular.module('NewsPub', ['ngRoute']).controller('ListController',function($scope){

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
    $scope.newsList = newsList;
});