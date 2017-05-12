/**
 * Created by lzhan on 2017/5/11.
 */
// 'use strict';




var a = 1;
function foo() {
    a = 10;
    return;
    var a=function () {}
}
foo();
console.log(a);


//等价于...
var a;

function foo() {
    var a;
    a=function () {

    };
    a=10;
    return;
}

a=1;

foo();
console.log(a);

