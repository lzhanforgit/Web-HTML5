/**
 * Created by lzhan on 2016/12/22.
 */

'use strict';

angular.module('phoneCart',['phoneCartDirective'])
    //内部自定义组件
    // .directive('phList', function () {
    //     return {
    //         // can be used as attribute or element
    //         restrict: 'AE',
    //         // which markup this directive generates
    //         template: '<button>-</button>' +
    //         '<div>0</div>' +
    //         '<button>+</button>'
    //     };
    // })
    .component('phoneCart', {
        templateUrl: 'phone-cart/phone-cart.template.html',
        // controller: ['$routeParams', 'Phone',
        //     function PhoneCartController($routeParams, Phone) {
        //         var self = this;
        //         self.phones = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
        //             self.setImage(phone.images[0]);
        //         });
        //
        //         self.setImage = function setImage(imageUrl) {
        //             self.mainImageUrl = imageUrl;
        //         };
        //     }
        // ]
        controller: ['Phone',
            function PhoneListController(Phone) {
                this.phones = Phone.query();
                this.orderProp = 'age';
            }
        ]
    });


