&copy;詹亮                     - site : https://github.com/lzhanforgit/H5Resources
#part 1
1. async

		<script src="..." asynv></script>
		// 异步加载、解析文件。但是会在页面load加载之前执行，
		//但会在DOMContentLoaded之前或者之后执行
2. 文档模式
	
	文档模式通过doctype参数设置，模式分为混杂模式和标准模式，后来又提出准标准模式。 准标准模式分为过度（transitional）模式和框架集(frameset)模式。准标准模式和标准模式几乎没有区别。
		
	标准模式
	
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 //EN"
        "http://www.w3.org/TR/html4/strict.dtd">
        //html5
        <!DOCTYPE HTML>
        
       准标准模式
       
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
        
3. 严格模式

	ES5引入严格模式，严格模式就是为js定义了一种不同的解析和执行模型。
		
		//可以放在脚本顶部
		 "use strict"
		 //或者放在方法内部
		 function func(){
		 	"use strict"
		 }
4. 变量

		var a;
		var b='hello';
	注意：
		es的变量为松散类型，变量只是一个占位符。所以变量b并不是一个字符串类型。所以可以这样：
		
		b=100;
			
	局部变量当函数执行完之后（ES5块元素只有function）会被马上销毁。但是一下情况不同：
	
		fuction func(){
			//这个时候mess会被hoisting为全局变量，这个和Scope Chain有关
			mess='js'; 		
		}
5. undefined 和 null

	a. undefined
	
		在使用var 声明但没有初始化的时候，变量的值为undefined.
		
		if(undefined){} //相当于if(Boolean(undefined))和if(false)等价
	>注意：
	对于声明但未初始化和未定义是不同的，后者会报错。但是它们两执行 typeof语句返回全是undefined
	
	b. null
		
		null表示一个空对象指针，故typeof null 返回值为 'object'
		
	>当声明的变量准备保存对象引用时，最好设置为null.
	因为undefined是派生自null,所以 undefined==null 结果为true.
6. NaN
	
	当执行算术运算时，没有返回数值则返回NaN.
	
		var b=10*'abc'
		
	ES提供函数isNaN()
		
		isNaN(true) //结果为false,true会自动转为1
		isNaN(‘hello’) //结果为true
		isNaN('10') //结果为false,'10'会自动转为10
		alert(NaN==NaN) //结果为false
7. 数值转换 Number() parseInt() parseFloat()

	>Number()可以把任何类型转化为Number,而后两种则只可以把字符串转化为Number,当被转化对象为
	
	2. parseInt()

			parseInt('012',10)	//第二个参数表示转化的进制（2，8，10，16）。
			parseInt('1234abc')	//返回1234
			Number('1234abc')	//返回NaN
			parseInt('')	//返回NaN
			Number('')	//返回0
			//也可以用一元运算符+
			var n='012';
			Number(n)和+n等价
	3. parseFloat()

		只解析10进制数
		
		如果被解析的字符串中没有小数点，则结果为整数。
		
8. string

	ES中的字符串是不可以改变的，即，字符串一旦创建，它的值就不能改变，要改变的话，最后要销毁原先的存储空间。
	
	转化为字符串方法 tostring([2,8,10,16]) String()
	1. null 和 undefined没有tostring()
	2. 当变量内容不知道是否为null或者undefined时，可以用String()
		
9. 相等操作符
	
		undefined==null     //true
		NaN==NaN			//false
		undefined===null    //false
		
10. 异常处理

		var a=1;
        try{
           if(a==1){
               throw 'hahaha'
           }
        }catch(e) {
            alert(e);
        }finally {
            alert('我一定会出现');
        }
        
        //或者
        
        var a=1;
	    try{
	        if(a==1){
	            throw new Error('HAHAHA')
	        }
	    }catch(e) {
	        alert(e.message);
	    }finally {
	        alert('我一定会出现');
	    }
	>自定义异常处理
	
		window.onerror=handler;
	    function handler(mess,url,i) {
	        alert(mess);
	        alert(url);
	        alert();
	    }
	    alert(a);
    
10. 循环语句

	for(;;)
	for(k in arr){}

    label:for(;;)
	
	while(){}
	
	do{}while()
	

	
	break lable 或者 continue label
11.  arguments

		//  1、arguments对象为伪数组
		//  2、arguments对象与参数(m,n)内存空间是独立的
		//  3、参数传递的永远都是值,不能是引用
		function add(m,n) {
		   arguments[1]=10;
		   console.log(m+n);
		 }
    	add(12,0); //结果为22
		</script>
12. 执行环境及作用域

	>执行环境都会对应一个对象（比如浏览器端执行环境对象为window）,该环境中所有对象和变量都保存在这个对象上。
	
	>每个函数都有一个独立的执行环境，所有函数有作用域的概念。当函数执行时，该执行环境对象被推入一个环境栈中，执行完后，退出栈。
	
	---
	>作用域链（scope chain）
	
	>scope chain的作用是保证该环境能够访问到它有权访问的所有变量对象，scope chain 的前端永远是当前环境变量对象，比如，function环境的作用域链最前端为arguments对象（所以全局环境中没有arguments）.
	
	>scope chain遍历的顺序是先当前环境对象,然后外层环境。
	
13. callee
	
		function add() {
    		return arguments.callee;
		}
		function getres() {
    		return add();
		}
		console.log(getres());
	
	
#part 2 
###面向对象

1. 定义对象
	
	var person={
		key:value,
		key:value
	}
2. 原型

    ```
		function Person() {
	
		}
		Person.prototype.name='human';
		var per01=new per01();
		console.log(Object.getPrototypeOf(per01)==Person.prototype)
		console.log(Object.getPrototypeOf(per01).name)；
		//Person.prototype.constructor指向类本身
		console.log(Person.prototype.constructor);
		//判断对象实例是否属于类
		console.log(Person.prototype.isPrototypeOf(per01));  //true


		//有缺陷，当原型继承时constructor指向父类
		//****对象本身没有constructor属性,类本身也没有constructor，但是类的原型对象有constructor***

		//constructor属性本身不可枚举，enumberable:false
		console.log(per01.constructor==Person);

		console.log( per01 instanceof Person);  //true
		console.log( per01 instanceof Object);  //true

	```
	
3. 原型继续

	>当对象实例中含有和原型中同名的属性时，对象实例属性会屏蔽原型属性（即使属性的值为null）。但是可以通过 delete obj.atttibute 方式删除对象实例属性。
	>判断属性是否为对象实例属性

		obj.hasOwnProperty('attribute');//结果为true 则说明是对象实例属性
		
	>获取对象实例属性
	

		//获取所有对象实例属性
		var k=Object.keys(Person.prototype);
		var ks=Object.getOwnPropertyNames(per01);



	>查看属性（包括对象实例属性和对象原型熟悉），可以用 for( var k in obj),也可以用in
	
		console.log('name' in per01);

	>查看对象原型属性

		function getPrototypeProperty(obj,attr){
			return !obj.hasOwnProperty(atrr)&& (atrr in obj);
		}
	
4. 原型动态性
	
		function Person() {
	
		}

		Person.prototype.name='human';
		var person=new Person();
		//重写原型对象
		Person.prototype={
			 //constructor:Person, //针对下面第一点的改进措施
		    name:'xiaoming',
		    age:12
		};
		
		//针对下面第一点的进一步改进措施,
		
		Object.defineProperty(Person.prototype,'constructor',{
	    value:Person,
	    enumberable:false
		});
		console.log(person.name);//结果为human
	
	>重写原型对象出现的新情况
	>
	>1. 之前Person.prototype中的constuctor属性指向Person,重写之后	Person.prototype中的constuctor指向Object,而且枚举属性enumberable:true.
	
	>2. 对象实例prototype属性任然指向重写之前的Person.prototype（p176）

5. 组合使用构造函数模式和原型模式
>构造函数用于定义实例属性，原型模式用于定义方法和共享的属性。
6. 动态原型模式
	
		function Person(name,age) {
	    this.name=name;
	    this.age=age;
	    if(typeof show !='function'){
	        Person.prototype.show=function () {
	            console.log(this.name);
	        	}
	    	}
		}
---

####面向对象-继承

1. 原型链继承

		function Person() {
	    	this.name='person';
		}
		Person.prototype.showPerson=function () {
		    console.log(this.name);
		};
		
		function Student() {
		    this.type='student';
		}
		Student.prototype=new Person();
		Student.prototype.showStudent=function () {
		    console.log(this.type);
		}
		
		var s=new Student();
		s.name='tom';
		s.showPerson();
		
	>子类原型指向父类原型对象，所以子类原型对象属性继承了父类原型对象属性（包括	constructor属性），所以，
	
		console.log( Student.prototype.constructor);
		console.log( s.constructor); //结果为Peson
	>但是，
	
		console.log( s instanceof Student);//结果为true.
		console.log( s instanceof Person);//结果为true.
		console.log( s instanceof Object);//结果为true.
		console.log( Student.prototype.isPrototypeOf(s));//true
	>不能使用对象自变量创建子类原型方法,如下，
	
		Student.prototype={
		    showStudent:function () {
		        console.log(this.type);
		    }
		}
		
	><b style='color:red'>*原型链继承出现的问题，在于当父类原型属性为引用时，所有子类对象共享该原型属性。	</b>
	
2. 经典继承（call,apply）

	>经典继承只是借用了父类的构造方法，子类原型和父类原型对象没有关联，所以子类无法访问父类原型属性和方法。
	
	><b style='color:red'>*经典继承出现的问题：无法复用父类的方法，每个子类对象都会产生副本	</b>
	
3. 复合继承（伪经典继承）

	>用原型链继承实现原型属性和方法的基础，使用经典继承实现实例对象属性的继承。

4. 原型式继承
	
		var machine={
		    name:'car',
		    color:['red','blue','green']
		};
		
		var bmw=Object.create(machine);
		var ben=Object.create(machine);
		ben.color.push('white');
		console.log(machine.color);
	
	Object.create()方法实现
		
		Object.create = function(o) {
			function F(){};
			F.prototype=o;
			return new F();
		};
5. 寄生式继承
6. 组合寄生式继承

###函数表达式
1. 函数声明提升（function declaration hoisting）

	可以先写调用语句，后写声明语句
	
		sayHello();
		function sayHello() {
		    console.log('hello');
		}
		
		var a;
		function a() {
		    console.log('aaa')
		}
		
		console.log(typeof a); //结果为function
		
	###补充：
	
	code:
	
		var a = 1,
	    b = function a(x) {
	        x && a(--x);
	    };
		alert(a);
	这段代码看起来比实际上复杂得多。结果是alert “1”。 不用太困惑。同样的，这段代码需要你知道关于JavaScript的三件事。
	>
	>首先， 变量声明提升。上一个例子已经讲过。
	>
	>第二个方面是函数声明提升。所有的函数声明同变量声明一样都会被提升至当前的作用域顶部。
很重要的一点是，一个函数声明如下：

		function functionName(arg1, arg2) {
		    // function body
		}

	>对应是函数表达式， 其实也就是变量初始化赋值。

		var functionName = function(arg1, arg2) {
		    //function body
		};

	>函数表达式并不会被提升。这其实也就是变量初始化。
	>
	>第三点就是你必须知道和理解函数声明会覆盖了变量声明但没有覆盖变量初始化。为了理解这一点，看看下面的例子

		function value() {
		    return 1;
		}
		var value;
		alert(typeof value); // "function"

	>上面的value作为function而结束了，即使变量声明出现在函数声明之后。在这种情况下函数声明会获得更高的优先权。
但是下面的例子会有不同的结果。
		
		function value() {
		    return 1;
		}
		var value = 1;
		alert(typeof value); // "number"

	现在value的值为1, 变量初始化覆盖的函数声明。

	我们再看一个例子:

		var a = 1;
		function foo() {
		    a = 10;
		    return;
		    function a() {}
		}
		foo();
		alert(a);

	上面的例子会alert 1, 上面的这段代码实际执行是这样的，

		var a;
		function foo() {
		    function a() {}
		    a = 10;
		    return;
		}
		a = 1;
		foo();
		alert(a);

	这样你应该就不难理解为什么会是1了吧。

	>回到code, 那个函数实际上是函数表达式即使有函数名a, 有名称的函数表达式并不会被认为是函数声明因此不会被覆盖变量声明。不过，你可能会发现包含函数表达式的变量是b, 而函数表达式的名称是a。 不同浏览器会做不同的处理，IE会认为function a() {}是函数声明，因此它会被变量初始化覆盖，意味这当调用a(--x)是会抛出一个错误。其他浏览器允许在函数里调用a(--x)即使函数外部a的类型的number。 同时，在IE中调用b(2)会抛出一个error但是在其他浏览器中抛出undefined。

	Code Two 可以简化为更加正确并容易理解的代码，如下：

		var a = 1,
		    b = function(x) {
		        x && b(--x);
		    }
		alert(a);

2. 递归

		function  fectorial(num) {
		    if(num<1){
		        return 1;
		    }else {
		        return num*fectorial(num-1);
		    }
		}
	但是执行以下操作
	
		var cc=fectorial;
		fectorial=null; //这条语句必不可少哦
		console.log(cc(5))
		
	结果为：error
	
	改进措施：
	
		function  fectorial(num) {
		    if(num<1){
		        return 1;
		    }else {
		        return num*arguments.callee(num-1);
		    }
		}
	以上代码在严格模式下任然出错
		
		'use strict'
		
	继续改进：采用命名函数表达式
		
		'use strict'
		var  fectorial=(function f(num) {
		    if(num<1){
		        return 1;
		    }else {
		        return num*f(num-1);
		    }
		})
		
3. 闭包
	
		function foo(x) {
	   		 var tmp = 3;
	   		 return function (y) {
                console.log(x + y + (++tmp));
	   		 }
		}
		var bar = foo(2);   // bar 现在是一个闭包
		bar(10);
	
	注意，外部函数不是必需的。通过访问外部变量，一个闭包可以维持（keep alive）这些变量。在内部函数和外部函数的例子中，外部函数可以创建局部变量，并且最终退出；但是，如果任何一个或多个内部函数在它退出后却没有退出，那么内部函数就维持了外部函数的局部数据。这里有利也有弊，当要维持这个数据且保持神秘性的时候，它是有利的；但不需要后续操作时，它浪费内存。
解决方案：
		
		bar=null;


		
4. 闭包和变量

		function foo() {
		    var arr=new Array(10);
		    for(var i=0;i<arr.length;i++){ //i 为foo 变量对象属性
		        // arr[i]=function () {
		        //arr[i] 都保存一个匿名方法的引用
		        //     return i;   //每个匿名方法作用域链都指向foo 变量对象
		        // }
		
		        (function () {
		           arr[i]=i;
		        })()
		    }
		    return arr;
		}
		
		// console.log(foo()[1]());
		console.log(foo());
		
5. 闭包和this( angular 的provider 就是闭包)

	>每个函数被调用时，其活动对象都会自动取得两个特殊变量，arguments和this.内部函数在搜索这俩对象时，只会在其活动对象上搜索，不会访问其外部函数的这两个对象。所以如果内部函数如果需要访问，只能把外部函数中的this赋值给一个变量，如
	
		function outfunc(){
			var that=this;
			function infunc(){
					...
			}
		}
		
6. 内存泄漏

7. 模仿块级作用域

		(function(){
			...
		})()

	
#part3 BOM

1. window
	
    	var a=12;
    	console.log(window.a);	//12
    	
    	// var b=12和window.b=12是不同的
    	
    	var b=12; 
    	delete b; //不可行
    	window.b=12;
    	delete window.b //  可行,但是ie>9
	
2. location

    >location 既是window的属性，也是document的属性。所以window.location===document.location
    *  host
    *  hostname
    *  href
    *  pathname
    *  port 
    *  search


   
    ``` 
        location.assign('11.html');
        //下面两种方式，内部都会调用上面的方法，把当前页面注册到历史记录中
        location.href='11.html';
        window.location='11.html'
        
        
        location.assign('11.html');
        location.hash='#querybook';
        location.pathname='/book';
        location.search='id=001';
        location.port='8080';
    ```
	>location.replace('url');该方法也会跳转页面，同时会清空历史记录。
	
	---
	
	* hash
	
	>对于Ajax页面来说的话，一般用一个页面来处理所有的事务，也就是说，如果你浏览到一个Ajax页面里边有意思的内容，想将它收藏起来，可是地址只有一个呀，下次你打开这个地址，还是得像以往一样不断地去点击网页，找到你钟情的那个页面。另外的话，浏览器上的“前进”“后退”按钮也会失效，这于很多习惯了传统页面的用户来说，是一个很大的使用障碍。

    >那么，怎么用location.hash来解决这两个问题呢？其实一点也不神秘。

    >比如，作者管理系统，主要功能有三个：普通搜索、高级搜索、后台管理，我分别给它们分配一个hash值：#search、#advsearch、#admin，在页面初始化的时候，通过window.location.hash来判断用户需要访问的页面，然后通过javascript来调整显示页面。比如：
    
    ~~~
        var hash; 
        hash=(!window.location.hash)?"#search":window.location.hash; 
        window.location.hash=hash; 
          //调整地址栏地址，使前进、后退按钮能使用 
        switch(hash){   
        case "#search":  
            selectPanel("pnlSearch");   //显示普通搜索面板  
            break;    
        case "#advsearch":    
              
        case "#admin":  
             
        }
    ~~~
    
    * 	reload()
    
    >reload方式以最简单的方式重新加载，如果页面没有任何变化，浏览器会从缓存中重新加载；当然如果强制重新加载，则：
    
    
    ```
        location.reload(true);
    ```
	
	
#part4 DOM


