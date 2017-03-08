/**
 * Created by lzhan on 2016/12/23.
 */
angular.module('phoneManage',['ui.router', 'ngGrid','phoneManageListModule'])
    // .component('phoneManage', {
    //     templateUrl: 'phone-manage/phone-manage.template.html',
    //     controller: ['Phone',
    //         function PhoneManageController(Phone) {
    //             this.phones = Phone.query();
    //             this.orderProp = 'age';
    //         }
    //     ]
    // });
    // .run(function($rootScope, $state, $stateParams) {
    //     // this.$state = $state;
    //     // this.$stateParams = $stateParams;
    // })
    .config(function($stateProvider, $urlRouterProvider) {
        console.log('here');
        // $urlRouterProvider.otherwise('/phonemanage');
        $stateProvider
            .state('allphones', {
                url: '/{phoneType:[0-9]{1,4}}',
                views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                    '': {
                        templateUrl: 'phone-manage/phone-manage.template.html'
                    },
                    'phoneType@allphones': {
                        templateUrl: 'phone-manage/pages/phone-type.template.html'
                    },
                    'phoneGrid@allphones': {
                        templateUrl: 'phone-manage/pages/phone-grid.template.html'
                    }
                }
            })
            .state('addbook', {
                url: '/addbook',
                templateUrl: 'tpls/addBookForm.html'
            })
            .state('bookdetail', {
                url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
                templateUrl: 'tpls/bookDetail.html'
            })
    });
