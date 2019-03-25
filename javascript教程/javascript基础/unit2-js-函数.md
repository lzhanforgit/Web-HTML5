#函数
1. 内置函数-类型转化

	1. parseInt('123')

		将字符串类型的数字转化为整数，转化的过程中直接取整、不会四舍五入。
			
			var s1='123.9';

			//这个是时候+是字符串连接符
			console.log(s1+4);   //123.94
			
			var n1=parseInt(s1);
			
			console.log(n1+4);   //127
			
			var s2='123abc'
			
			//可以转化
			var n2=parseInt(s2);
			
			console.log(n2+4)  //127
			
			//不可以转化
			
			var s3='a123abc';
			var n3=parseInt(s3);   //NAN

	2. Number('123')
		
			//不可以转化
			
			var s3='123abc';
			var n3= Number(s3);   //NAN
			
	3. 补充

			var s4='123';

			// var n4=s4*1;
			
			var n4=~~s4;
			
			console.log(n4);

		
2. parseFloat('123.9')

		// var s3='123.9';
		var s3='123';
		
		var n3=parseFloat(s3);
		console.log(n3+1);
		
		console.log(typeof n3);

3. 转化为字符串

		var n5=123;

		// var s5=String(n5);
		
		var s5=n5+'';
		
		console.log(typeof s5);
		
4. isNAN

5. 布尔类型转化

	1. 其他类型转化boolean

			var a=0;

			var s6='';
			
			var b=undefined;
			
			var c=null;
			
			var d=[];
			
			// var b1=Boolean(a);
			var b1=!!a;
			
			console.log(b1)
			
			// var b2=Boolean(s6);
			
			var b2=!!s6;
			
			console.log(b2);
			
			console.log(!!b);
			console.log(!!c);
			console.log(!!d); //true
			
			
			//1. python中空列表，空字典，空集合，空元组都是False
			//2. python中True False ,js中true,false
			//3. python中bool(),js中Boolean()
			
	2. boolean转化为其他类型

	 		// var f1=false;
			var f1=true;
			
			console.log(f1+1);  //2
			
			var f2=true;
			
			console.log(true+'hello');  //truehello
			console.log(true+'123');  //true123
			
1. 自定义函数

	1. 函数的定义方式

			function add(a,b) {  //形参
			    var c=a+b;
			    return c;
			}
			
			function add(a,b) {
			    return a+b;
			}
			
			等价于下面：
			var add=new Function('a,b','return a+b;');
		* 1. 函数的表示是function
		* 2. 函数名符合变量的命名规则
		* 3. 参数没有类型（js是一种弱类型的语言）
		* 4. 返回值通过retuan返回（可以没有return）
		* 5. js中没有同名函数
	2. ES6

		// 默认值参数
		
			function add(a,b,c=0) {  //形参
			    var d=a+b+c;
			    return d;
			}

		
		//不定长参数
		
			function add(a=0,...args) {  //形参
			   console.log(a);
			   console.log(args);
			}
		**args**类型是数组
		
	3. 参数对象arguments

			// function add() {
			//     var total=0;
			//
			//     //argument 是一个json
			//
			//     console.log(typeof arguments);
			//     for(var i of arguments){
			//         total=total+i;
			//     }
			//
			//     return total
			// }
			
3. 严格模式

	在文件的开头加上
	
		"use strict";
	严格模式和非严格模式的区别
	
	1. arguments

		在严格模式下arguments和形参只会传值一次，以后就没有关联
		
		在非严格模式下arguments和形参一直关联
		
			// function add(a,b,c) {
			//     var total=0;
			//
			//     a=5;
			//     total=a+b+c;
			//
			
			//在严格模式下
			//     console.log(arguments[0]);  //输出1
			
			//在非严格模式下
			//     console.log(arguments[0]);  //输出5
			//
			//
			//     return total;
			// }
			
			var res=add(1,2,3);
	2. 不允许变量不声明直接赋值

			x=3.14;
			console.log(x);  // x is not defined
			
		但是下面的情况由于会声明提升，所以不会错误
		
			console.log(add(1,2));
			function add(a,b) {  //形参
			    var c=a+b;
			    return c;
			}
	3. 不允许变量重名:

			"use strict";
			function x(p1, p1) {};   // 报错
			
	[参考链接](http://www.runoob.com/js/js-strict.html)
2. 匿名函数（通过函数表达式实现）

		// 函数表达式
		var add=function (a,b) {
		    return a+b;
		};
		
	**ES6匿名函数**(4)
	
	1. 格式

			（参数）=>{函数体}
			
	2. 有多个参数

			var add=(a,b)=>a+b;
		
	3. 有一个参数（形参的括号可以省略）

			var add=a=>a+b;
			var add=（a）=>a+b;
	4. 没有参数

			var add=()=>'hello';
			
			
2. 函数作用域

	1. 声明提升（**把声明提升到当前作用域的顶部**）

			var v=1;
			function out() {
			
			    // v=5;
			    // var v=3;
			    // console.log('1-'+v);
			
			    //相当于
			    var v;
			    v=5;
			    v=3;
			    console.log('1-'+v);
			}
			
			out();
			
			console.log('2-'+v);
			
			
			function outer() {
			    var j=1;
			
			    function inner() {
			        console.log(i);
			    }
			    inner();
			    var i=100;
			}
			
			//相当于
			function outer() {
			    var j=1;
			    var i;
			    function inner() {
			        console.log(i);
			    }
			    inner();
			    i=100;
			}
			
			输出undefined
			
	2. 作用域链
	3. 闭包

			function outer() {
			    var j=1;
			    function inner() {
			        console.log(i);
			    }
			  		//return inner;   输出undefined
			    var i=100;
			    return inner;
			
			
			}
			
			
			// var func=outer();
			//
			// func();
			
			outer()();  //100
3. 三元运算符

		var res = a > 0 ? 'yes' : 'no';

		console.log(res);

