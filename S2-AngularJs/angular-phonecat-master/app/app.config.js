'use strict';

angular.module('phonecatApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/phones', {
            template: '<phone-list></phone-list>'
        }).when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
        }).when('/phones/manage/:null', {
            template: '<phone-manage></phone-manage>'
        }).when('/phones/cart/:phoneId', {
            template: '<phone-cart></phone-cart>'
        }).otherwise('/phones');
    }
]);
