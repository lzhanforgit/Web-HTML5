&copy;詹亮                     - site : https://github.com/lzhanforgit/H5Resources
# ES6
### 第一部分
0. 块级元素 let

   1. let
    >let声明的变量不会自动提升到当前函数作用域的顶部

    >如果一个标识符在当前作用域里已经存在，那么再用 let 声明相同的标识符或抛出错误

1. 正则表达式

    1. test
        >test 返回 Boolean，查找对应的字符串中是否存在模式。

       ```
       {
          let rgx=new RegExp(/^\d+\w+$/i);
          //let rgx=new RegExp(/^[a-z]+$/i);
          var s='343435wwwfdfd3434';

          var f=rgx.test(s);
          console.log(f);
       }

       ```
    2. exec
       >exec 查找并返回当前的匹配结果，并以数组的形式返回。

       >exec 方法受参数 g 的影响。若指定了 g，则下次调用 exec 时，会从上个匹配的 lastIndex 开始查找

       ```
       {
          let rgx=new RegExp(/hello/g);
          var s='hi hello world,hello china';

          var res=rgx.exec(s);
          console.log(res)
          var res=rgx.exec(s);
          console.log(res)
       }
       ```

    3. match

        >match 这个方法有点像 exec，但：exec 是 RegExp 对象的方法；math 是 String 对象的方法。
        二者还有一个不同点，如果指定了参数 g，那么 match 一次返回所有的结果。

        ```
         let rgx=new RegExp(/hello/g);
           var s='hi hello world,hello china,hello';

           var res=s.match(rgx);
           console.log(res)
           //[ 'hello', 'hello', 'hello' ]
        ```
    4. replace

        ```
        let rgx=new RegExp(/helloo/);
        var s='hi hello world';

        s=s.replace(/[e,o]/g,'A');
        console.log(s)
        ```
3. 扩展运算符

   >扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值

   ```
   var foo = function(a, b, c) {
       console.log(a);
       console.log(b);
       console.log(c);
   }

   var arr = [1, 2, 3];

   //传统写法
   foo(arr[0], arr[1], arr[2]);

   //使用扩展运算符
   foo(...arr);
   //1
   //2
   //3
   ```

   特殊应用场景：
   ```
    //数组深拷贝

    var arr1=[];
    var arr2=[4,5,6];
    Array.prototype.push.apply(arr1, arr2);


    console.log(arr1);

    console.log(arr1==arr2);//false
   ```

   ```


   //数组深拷贝
   var arr2 = arr;
   var arr3 = [...arr];
   console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
   console.log(arr===arr3); //false, 说明arr3和arr指向不同数组

   //把一个数组插入另一个数组字面量
   var arr4 = [...arr, 4, 5, 6];
   console.log(arr4);//[1, 2, 3, 4, 5, 6]

   //字符串转数组
   var str = 'love';
   var arr5 = [...str];
   console.log(arr5);//[ 'l', 'o', 'v', 'e' ]
   ```
4. Math 扩展

    ```
    var num=-123.008;
    console.log(Math.floor(num));//-124
    console.log(Math.trunc(num));//-123
    ```

5. 数组的扩展

    0. 补充数组知识...

    1. Array.from方法用于将类数组转为真正的数组

        ```
        // 'use strict';
        function show(a=1,b=10,c=100) {
            arguments[1]=800;
            console.log(a+'>>'+b+'>>'+c);
            arguments[1]=800;
            //var args=(new Array).slice.call(arguments,0);
            //var args=Array.prototype.slice.call(arguments,0);
            var args=Array.from(arguments);
            args.sort();
            console.log(args);
            console.log(a+'>>'+b+'>>'+c);
        }
        show(400,200,300);
        ```
        >Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

        ```
        var s='123';
        var sarr=Array.from(s,x=>x*x);
        console.log(sarr);

        var arr1=[];
        var arr2=[4,5,6];
        arr2=arr2.map(function (x) {
            return x*x
        })
        console.log(arr2);
        ```


    2. 数组实例的copyWithin()

          >数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

              ```
              Array.prototype.copyWithin(target, start = 0, end = this.length)
              ```
          它接受三个参数。

              * target（必需）：从该位置开始替换数据。
              * start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
              * end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。


          ```
          // 将3号位复制到0号位
          [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
          // [4, 2, 3, 4, 5]

          // -2相当于3号位，-1相当于4号位
          [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
          // [4, 2, 3, 4, 5]

          // 将3号位复制到0号位
          [].copyWithin.call({length: 5, 3: 1}, 0, 3)
          // {0: 1, 3: 1, length: 5}

          // 将2号位到数组结束，复制到0号位
          var i32a = new Int32Array([1, 2, 3, 4, 5]);
          i32a.copyWithin(0, 2);
          // Int32Array [3, 4, 5, 4, 5]

          // 对于没有部署TypedArray的copyWithin方法的平台
          // 需要采用下面的写法
          [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
          // Int32Array [4, 2, 3, 4, 5]
          ```

    3. 数组实例的includes()

       >Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，
       与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

       ```
       var arr=[1,2,3,4,50,60,70,80,90];


       console.log(arr.includes(50));//true
       ```
1. 箭头操作符

    ```
	//demo-1
	var arr=[1,2,3];

	arr.foreach(v=>console.log(v));
	
	//demo-2
	var max=function (a,b,callback) {
        callback(b);
    }

    max(10,20,r=>{
        r=r*r;
        console.log(r);
    })
    ```
    链接：https://imququ.com/post/arrow-function-in-es6.html
2. class

	```
	//类的定义
	class Animal {
	//ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
	}
	//类的继承
	class Programmer extends Animal {
    constructor(name) {
    	//直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
	}
	//测试我们的类
	var animal=new Animal('dummy'),
	wayou=new Programmer('wayou');
	animal.sayName();//输出 ‘My name is dummy’
	wayou.sayName();//输出 ‘My name is wayou’
	wayou.program();//输出 ‘I'm coding...’
	```

3. 字符串模板、字符串置换
    >注意是反引号"`"

    ```
    let s=`hello
                world`;

    console.log(s.length);

    console.log(s);

    let s=`hello
                    world`.trim();  //去除前、后空格

    ```

    ```
	//产生一个随机数
	var num=Math.random();
	//将这个数字输出到console
	console.log(`your num is ${num}`);
	```

    >模板

    ```
    let name='book';

    let count=10,
        price=1.2345;

    let s=`${name} cost ${count*price.toFixed(3)} `;

    console.log(s);
    ```

    模板自变量定义多行标签
    ```
    window.onload=function () {
            let div=document.querySelector('#table');

            let books=[
                {name:'001',price:12},
                {name:'002',price:120},
                {name:'003',price:1200},
                {name:'004',price:12000}
            ]

            let s='';

            for(let i=0;i<books.length;i++){
                s+=`<tr>
                    <td>${books[i].name}</td>
                    <td>${books[i].price}</td>
                    </tr>`;

            }

            div.innerHTML=s;
        }
    ```
4. 解构
    自动解析数组或对象中的值。比如若一个函数要返回多个值，常规的做法是返回一个对象，将每个值做为这个对象的属性返回。但在ES6中，利用解构这一特性，可以直接返回一个数组，然后数组中的值会自动被解析到对应接收该值的变量中。
    ```
    var [x,y]=getVal(),//函数返回值的解构
        [name,,age]=['wayou','male','secrect'];//数组解构

    function getVal() {
        return [ 1, 2 ];
    }

    console.log('x:'+x+', y:'+y);//输出：x:1, y:2
    console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect
    ```
5. 函数
    1. 函数默认参数值
        ```
    	function  show(name='helen') {
            var n=name;
            console.log(`name is ${name}`);
        }
        show('tom');
        ```
        >当使用 ECMAScript 6 的默认参数时，arguments对象的表现和 ECMAScript 5 的严格模式一致，不管函数是否显式设定为严格模式。默认参数的存在会使 arguments 对象对该命名参数解绑。

        ```
        function getValue() {
            return 5;
        }

        function add(first, second = getValue()) {
            return first + second;
        }

        console.log(add(1, 1));     // 2
        console.log(add(1));        // 6
        ```
    2. 函数不定参数
        不定参数是在函数中使用命名参数同时接收不定数量的未命名参数。这只是一种语法糖，在以前的JavaScript代码中我们可以通过arguments变量来达到这一目的。不定参数的格式是三个句点后跟代表所有不定参数的变量名。比如下面这个例子中，…x代表了所有传入add函数的参数。
    x为数组对象

        ```
    	function add(...x){
            x.forEach(i=>console.log(i))
            return x.reduce((m,n)=>m+n);
        }
        //传递任意个数的参数
        console.log(add(1,2,3));//输出：6
        console.log(add(1,2,3,4,5));//输出：15
        ```
    3. 拓展参数

        ```
    	var people=['Wayou','John','Sherlock'];
    	//sayHello函数本来接收三个单独的参数人妖，人二和人三
    	function sayHello(people1,people2,people3){
    		console.log(`Hello ${people1},${people2},${people3}`);
    	}
    	//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
    	sayHello(...people);//输出：Hello Wayou,John,Sherlock

    	//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
    	sayHello.apply(null,people);//输出：Hello Wayou,John,Sherlock
    	```
8. for of 值遍历
    我们都知道for in 循环用于遍历数组，类数组或对象，ES6中新引入的for of循环功能相似，不同的是每次循环它提供的不是序号而是值。

    ```
	var someArray = [ "a", "b", "c" ];
 
	for (v of someArray) {
    	console.log(v);//输出 a,b,c
	}
	```
9. 模块
    测试不通过？？？？？？？？


    [参考文章](http://blog.csdn.net/lihongxun945/article/details/49031383).



10. 集合

    >在ES5中，Array和JSON 可以这么写：

    ```
    var foo={};
    var n=12;
    foo[12]='tom';

    foo.age=12;
    console.log(foo[n]);    // tom
    console.log(foo['12']); //tom
    //在内部，数字类型的键会被转化为字符串，所以 map["12"] 和 map[12] 引用了相同的属性。

    console.log(foo.age);   //12

    ```

    >数组方式存在的问题

    ```
    var foo=[];

    console.log(typeof foo)
    foo['name']='tom';
    foo[1]=12;

    console.log(foo['name']);   //tom
    console.log(foo[1]);        //12

    console.log(foo.length);    //2

    console.log(foo[0]);        //undefined

    //-------------------

    var person1={};
    var person2={};

    foo[person1]='onic';

    console.log(foo[person1]);  //onic
    console.log(foo[person2]);  //这里还是onic

    ```

    那开始介绍SET和MAP

    1. set

        >ECMAScript 6 中的 set 类型是一个包含无重复元素的有序列表。Set 允许对内部某元素是否存在进行快速检查，使得元素的追踪操作效率更高。

        >set 由 new Set() 语句创建并通过调用 add() 方法来向 set 中添加项。你还可以查看 set 的 size 属性来获取项的数目：

         ```
         let set=new Set();

         set.add(12);
         set.add(13);


         console.log(set.size);  //2

         set.add(13);

         console.log(set.size);  //应为set内容不允许出现重复，所以结果还是2
         ```
        >因为 key1 和 key2 不会转换为字符串，所以它们 set 认为两者都是唯一的（记住，如果它们被转换为字符串，那么值都是 "[object Object]"）。

         ```
         let set = new Set(),
             key1 = {},
             key2 = {};

         set.add(key1);
         set.add(key2);

         console.log(set.size);    // 2
         ```
        你可以使用数组来初始化一个 set，而且 Set 构造函数会确保使用数组中唯一存在的元素。例如：

        ```
        let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
        console.log(set.size);    // 5

        console.log(set.has(1));  //true

        set.delete(2);

        console.log(set.size);    // 4

        set.clear();

        console.log(set.size);    // 0



        set.forEach(function (v,k,_set) {
        //其中v,k的值相同，因为set没有key，为了保持和数组的forEach方法同步
            console.log(_set)
        })
        ```

        利用扩展运算符，将set转化为数组

        ```
        let set = new Set([1, 2, 3, 3, 3, 4, 5]),
            array = [...set];

        ```

        ***利用这个特性，可以很容易实现，去掉数组中的重复项

        ```
        //items为含有重复项的数组
        function eliminateDuplicates(items) {
            return [...new Set(items)];
        }
        ```

    2. map

        ```
        let map = new Map();
        map.set("title", "Understanding ES6");
        map.set("year", 2016);

        console.log(map.get("title"));      // "Understanding ES6"
        console.log(map.get("year"));       // 2016
        console.log(map.size);              // 2


        ```

        * has(key) - 判断给定的 key 是否在 map 中存在
        * delete(key) - 移除 map 中的 key 及对应的值
        * clear() - 移除 map 中所有的键值对

        map也可以用数组初始化，也可以使用forEach()

        ```
        let map = new Map([["name", "Nicholas"], ["age", 25]]);
        ```






    http://www.cnblogs.com/Wayou/p/es6_new_features.html


### 第二部分

1. 深入解析 ES6：Generator

    先上一段代码

        ```
        function* quips(name) {
            yield `hello ${name} !`;
            yield "i hope you are enjoying the blog posts";
            if (name.startsWith("X")) {
                yield "it's cool how your name starts with X, " + name;
            }
            yield "see you later!";
        }
        ```
    >解释

    1. 通常的函数以 function 开始，但 Generator 函数以 function* 开始。
    2. 在 Generator 函数内部，yield 是一个关键字，和 return 有点像。不同点在于，所有函数（包括 Generator 函数）都只能返回一次，而在 Generator 函数中可以 yield 任意次。yield 表达式暂停了 Generator 函数的执行，然后可以从暂停的地方恢复执行。
    >接下来调用

        var iterator=quips('lzhan');

    1. Generator 函数的调用方法与普通函数一样：quips("lzhan")，但调用一个 Generator 函数时并没有立即执行，*而是返回了一个 Generator 对象（上面代码中的 iterator）*，这时函数就立即暂停在函数代码的第一行。

    2. 每次调用 Generator 对象的 .next() 方法时，函数就开始执行，直到遇到下一个 yield 表达式为止。

    这就是为什么我们每次调用 iterator.next() 时都会得到一个不同的字符串，这些都是在函数内部通过 yield 表达式产生的值。

    3. 当执行最后一个 iterator.next() 时，就到达了 Generator 函数的末尾，所以返回结果的 .done属性值为 true，并且 .value 属性值为 undefined。

    改进、循环输出

    ```
	var iterator=quips('lzhan');
	var f=iterator.next();
	while (!f.done){
    	console.log(f.value);
    	f=iterator.next()
	}
	```

    1. 从技术层面上讲，每当 Generator 函数执行遇到 yield 表达式时，函数的栈帧 — 本地变量，函数参数，临时值和当前执行的位置，就从堆栈移除，但是 Generator 对象保留了对该栈帧的引用，所以下次调用 .next() 方法时，就可以恢复并继续执行。

    2. 值得提醒的是 Generator 并不是多线程。在支持多线程的语言中，同一时间可以执行多段代码，并伴随着执行资源的竞争，执行结果的不确定性和较好的性能。而 Generator 函数并不是这样，当一个 Generator 函数执行时，它与其调用者都在同一线程中执行，每次执行顺序都是确定的，有序的，并且执行顺序不会发生改变。与线程不同，Generator 函数可以在内部的 yield 的标志点暂停执行。

2. 解决异步问题

    异步 API 通常都需要一个回调函数，这意味着每次你都需要编写一个匿名函数来处理异步结果。如果同时处理三个异步事务，我们看到的是三个缩进层次的代码，而不仅仅是三行代码。

    异步情况：读取三个文本文档

    ```
	var fs=require('fs');
	function  readFile() {
    	var s='';
    	fs.readFile('./txta.txt',function (error,data) {
        	s+=data;
        	console.log(s);
    	});
    	fs.readFile('./txtb.txt',function (error,data) {
        	s+=data;
        	console.log(s);
    	});
    	fs.readFile('./txtc.txt',function (error,data) {
        	s+=data;
        	console.log(s);
    	});
    	return s;
	}
	var result=readFile();
	console.log('end...'+result);
	```
	
    运行结果每次各不相同*****
	
    利用回调

    ```
	var fs=require('fs');
	function  readFile(callback) {
    	var s='';
    	fs.readFile('./txta.txt',function (error,data) {
        	s+=data;
        	console.log('a: '+s);
        	fs.readFile('./txtb.txt',function (error,data) {
            	s+=data;
            	console.log('b: '+s);
            	fs.readFile('./txtc.txt',function (error,data) {
                	s+=data;
                	console.log('c: '+s);
                	callback (s);
            	});

        	});
    	});
	}
	```

	//函数调用
	readFile(function (result) {
    	console.log('end...'+result);
	});

    异步 API 通常都有错误处理的约定，不同的 API 有不同的约定。大多数情况下，错误是默认丢弃的，甚至有些将成功也默认丢弃了。

    Generator 给我们带来了希望，我们可以不再采用上面的方式。

    Q.async()是一个将 Generator 和 Promise 结合起来处理异步代码的实验性尝试，让我们的异步代码类似于相应的同步代码。

    改进后代码

    ```
	var fs=require('fs');
		function run(gen) {
    	var gen_obj = gen(resume);
    	function resume() {
        	gen_obj.next(arguments);
    	}
    	gen_obj.next();
	}

	run(function* gen(resume) {
    	var ret, err, data;
    	ret = yield fs.readFile('./txta.txt', resume);
    	console.log(ret);
    	err = ret[0];
    	data = ret[1];
    	if (err) {
        	console.log(err);
    	} else {
        	console.log(data.toString());
    	}

    	ret = yield fs.readFile('./txtb.txt', resume);
    	err = ret[0];
    	data = ret[1];
    	if (err) {
        	console.log(err);
    	} else {
        	console.log(data.toString());
    	}
	});

    ```

    [参考网页](http://www.tuicool.com/articles/3YbIVv)

3. Promises
    ES6 原生提供了 Promise 对象。

    所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。

    回调函数真正的问题在于他剥夺了我们使用 return 和 throw 这些关键字的能力。而 Promise 很好地解决了这一切。

    Promise 对象有以下两个特点。

    （1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

    （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

    Promise 也有一些缺点。

    首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

    其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

    第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

    基本的 api

    ```
    Promise.resolve()

    Promise.reject()

    Promise.prototype.then()

    Promise.prototype.catch()

    Promise.all() // 所有的完成

	var p = Promise.all([p1,p2,p3]);
    Promise.race() // 竞速，完成一个即可
    ```

    demo
    ```
	function helloWorld (ready) {
    return new Promise(function (resolve, reject) {
        if (ready) {
            resolve("Hello World!");
        } else {
            reject("Good bye!");
        }
    });
	}
	//then有两个方法，第一个为SUCCESS,第二个为ERROR方法
	helloWorld(true)
    .then(function (message) {
            // console.log(message);
            return message;
        },
        function (error) {
            // console.log(error);
            return message;
        })
    .then(function (message) {
        console.log('success '+message);
        },
        function (message) {
            console.log('error '+message);
        })
    ```
	
   异常处理-catch

    catch 方法是 then(onFulfilled, onRejected) 方法当中 onRejected 函数的一个简单的写法，也就是说可以写成 then(fn).catch(fn)，相当于 then(fn).then(null, fn)。使用 catch 的写法比一般的写法更加清晰明确。

    demo
    ```
        helloWorld(false)
        .then(function (message) {
                // console.log(message);
                return message;
            },
            function (error) {
                // console.log(error);
                return error;
            })
        .then(function (message) {
                console.log('success '+message);
            })
        //    以下情况一和情况二等价
        //    情况一
        // .catch(function (message) {
        //     console.log('error '+message);
        // })
        //情况二
        .then(null,function (message) {
            console.log('error '+message);
        })
    ```

    ```

      var show=(x,y)=>{
          return new Promise((resolve, reject)=> {
              if (x>y) {
                  setTimeout(function () {
                      let k=x+y;
                      resolve(k);
                  })
              } else {
                  reject("Good bye!");
              }
          })
      }

      show(100,150).then(data=>{
          console.log(data);
      },data=>{
          console.log(data);
      };
      )
    ```

    Promise.all

    Promise.all 可以接收一个元素为 Promise 对象的数组作为参数，当这个数组里面所有的 Promise 对象都变为 resolve 时，该方法才会返回。

    demo

    ```
        var p1 = new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Hello");
        }, 3000);
        });

        var p2 = new Promise(function (resolve) {
            setTimeout(function () {
                resolve("World");
            }, 1000);
        });

        Promise.all([p1, p2]).then(function (result) {
            console.log(result); // ["Hello", "World"]
        });

	```

	//虽然 p2 的速度比 p1 要快，但是 Promise.all 方法会按照数组里面的顺序将结果返回。
	
    >还有一个和 Promise.all 相类似的方法 Promise.race，它同样接收一个数组，不同的是只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回。

    >如果要兼容旧的浏览器，建议可以寻找一些第三方的解决方案，例如 jQuery 的 $.Deferred。
	
	

