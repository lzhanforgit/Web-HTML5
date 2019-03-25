/**
 * Created by lzhan on 2017/5/11.
 */
// 'use strict';


// var a = 1;
// function foo() {
//     a = 10;
//     return;
//     var a=function () {}
// }
// foo();
// console.log(a);


//等价于...
// var a;
//
// function foo() {
//     var a;
//     a=function () {
//
//     };
//     a=10;
//     return;
// }
//
// a=1;
//
// foo();
// console.log(a);

'use strict';


// function foo() {
//     var arr=new Array(10);
//     var i=0;
//     for(;i<arr.length;i++){ //i 为foo 变量对象属性
//         // arr[i]=function () {
//         //         // arr[i] 都保存一个匿名方法的引用
//         //     return i;   //每个匿名方法作用域链都指向foo 变量对象
//         // }
//
//         // (function (a) {
//         //     arr[a]=a;
//         // })(i)
//
//         function med(a) {
//             arr[a]=a;
//         }
//
//         med(i);
//     }
//     return arr;
// }
// var v=foo()[8];
// console.log(v);


var user={
    name:'tom',
    hobby:['read','sleep']
}

// user.age=12;
//
// delete user.age;

var hob=user.hobby;




console.log(user.hobby);

console.log(hob);


var n=new Number(12);

