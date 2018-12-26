#js

1. ecma

	ECMA是“European Computer Manufactures Association”的缩写，中文称欧洲计算机制造联合会。是1961年成立的旨在建立统一的电脑操作格式标准--包括程序语言和输入输出的组织。
2. ecmascript(ES)

	ECMAScript是一种由Ecma国际（前身为欧洲计算机制造商协会,英文名称是European Computer Manufacturers Association）通过ECMA-262标准化的脚本程序设计语言。这种语言在万维网上应用广泛，它往往被称为JavaScript或JScript，所以它可以理解为是javascript的一个标准,但实际上后两者是ECMA-262标准的实现和扩展。
3. javascript

	在1995年时，由Netscape公司的Brendan Eich，在网景导航者浏览器上首次设计实现而成。因为Netscape与Sun合作，Netscape管理层希望它外观看起来像Java，因此取名为JavaScript。但实际上它的语法风格与Self及Scheme较为接近。 [1] 
为了取得技术优势，微软推出了JScript，CEnvi推出ScriptEase，与JavaScript同样可在浏览器上运行。为了统一规格，因为JavaScript兼容于ECMA标准，因此也称为ECMAScript。

	完整的JavaScript实现包含三个部分：ECMAScript，文档对象模型，浏览器对象模型。 [7] 
	
4. 本机安装js环境

	[node.js下载地址](https://nodejs.org/en/download/)
	
5. js基本机构

		<script type="text/javascript">
		    alert('hello');
		</script>
		
	通常情况下脚本放在代码的最后
	
6. 引入外部js文件

		<script src="js/unit33.js"></script>
7. 注释

	单行 // ctrl+/
	
	多行 /*  */  ctrl+shift+/
	
8. 变量

	**先声明再赋值**
	
	**所以会声明提升**
	
		a=3;
		var a=2;
		
		相当于
		
		var a;
		a=3;
		a=2;
		
	>在ES6中引入let,注意let不会声明提升
	
		b=3;
		let b=2; //b is not defined
		
	**变量命名语法规定**
		
	* 必须是字母、数字、下划线和$组成
	* 首字母不能是数字
	* 不能使用Javascript保留字
	* 命名区分大小写

9. 变量类型

	1. undefined
	2. null
	3. boolean
	4. number
	5. string
	6. object

10. typeof

	typeof的结果
	
	1. typeof 3:number
	2. typeof undefined:undefined
	3. typeof true:boolen
	4. typeof ' ':string
	5. typeof null:object
	6. typeof {}:object
	7. typeof 函数:function
	
11. 等于== 比较的是值，===比较的是值和类型同时相等

		
		var a=0;
		var b=null;
		var c;
		
		b==c; //true 因为b,c都会转化为boolean类型
		
		a==b;//false
		
		a==false: //true
		
		c==false: //false
		
		!!c==false: //true
		
		 NAN==NAN; //false
	
	
12. 条件语句

	if(boolean){....}

	1. 0=>false
	2. undefined=>false
	3. null=>false
	4. ''=>false
	5. {}/[]=>true
13. 循环

		for(var i=1;i<=10;i++){
		    console.log(i);
		}
		
		var j=100;
		while(j<=10){
		    console.log(j);
		    j++;
		}
		
		
		var k=100;
		do{
		    console.log(k);
		    k++;
		}while (k<=10);
		
	遍历数组
	
			var a=[10,20,30];

			for(var i=0;i<a.length;i++){
			    console.log(a[i])
			}
			
			for(var index in a){
			    console.log(a[index]);
			}
			
			
	**属于ES6**
	
			for(var item of a){
			    console.log(item);
			}

	>循环没有作用域，循环变量也是全局变量；

	**但是**
	
		for(let j=1;j<=5;j++){
		
		    let k=1;
		}
		
	let数据作用域变量，这个时候j就是循环内部的变量
	
		console.log(j); //j is not defined
		
	
		{
		    let a=1;
		    {
		        let b=2;
		        {
		            let c=3;
		        }
		    }
		    console.log(a);
		    // console.log(b); //b is not defined
		
		
		}

	let变量不可以重复声明
	
			let b=4;
			let b=5;
			
			console.log(b); //Identifier 'b' has already been declared
14. d

