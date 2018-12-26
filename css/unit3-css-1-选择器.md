##css

1. css

	CSS是Cascading Style Sheet的缩写，可以翻译为“层叠样式表”或“级联样式表”，即“样式表”.
	
	css 通常是css2.1
	
2. 引入样式的方法

	1. 行内样式
		
		有点：执行效率高
		缺点：css和html代码耦合，代码的重用性低x
		
			<div style="color: blue;font-size: 30px">hello css</div>
	2. 内部样式表
		
		有点：解决css和html代码耦合
		缺点：代码的重用性低
			 <style type="text/css">
		        .div-css{
		            width: 200px;
		            height: 200px;
		            background: grey;
		        }
		    </style>
	3. 外部样式表

		优点：代码重用性高，结构性好。
		缺点：执行效率低
		
		1. link

				<link rel="stylesheet" type="text/css" href="css/main.css">
		2. @import

				<style type="text/css">
       			 @import "css/main.css";
       		...
       		
       3. link 和 @import区别
			
			* <link/>标签属于XHTML，@import是属于CSS2.1
			* 使用<link/>链接的CSS文件先加载到网页当中，再进行编译显示
			* 使用@import导入的CSS文件，客户端显示HTML结构，再把CSS文件加载到网页当中
			* @import是属于CSS2.1特有的，对于不兼容CSS2.1的浏览器来说就是无效的。
			* @import 必须放在style标签的第一行
			* @import 可以用来合并外部样式文件

	4. div span
	
		1. div是块级元素
		2. div的宽度是他的父元素的宽度
		3. span 是行内元素

	4. css选择器

	
		5. 基本选择器的优先级

			行内>id>class>标签
			
		2. 后代选择器（空格）
		3. 交集选择器（选择器之间没有任何符号）

			通常是先写标签选择器，然后写类选择或者ID选择器
		4. 并集选择器（逗号）

3. 优先级计算公式
	
	选择器的优先级
	
	4. 行内：1000
	1. id : 0100
	2. class :0010
	3. 标签: 0001
	4. *通配符：0000

	[参考](https://www.cnblogs.com/zxjwlh/p/6213239.html)

			/*0031*/
	        body .container .middle .left{
	            width: 30%;
	            height: 300px;
	            background: red;
	        }
	
	        /*0100*/
	        #left01{
	            background: blue;
	        }
	
	        /*0101*/
	        body #left01{
	            background: green;
	        }
	
	        /*0131*/
	        body .container .middle .left#left01{
	            width: 30%;
	            height: 300px;
	            background: red;
	        }
	>1. 权重可以累积
	>2. 权重没有进制
	
	
	4. !important 不是选择器，所以没有权重，优先级最高

	
3. 样式继承

	1. 子标签可以继承父标签的样式风格
	1. 子标签的样式不会影响父标签的样式风格
	1. 不是所有的样式都能继承

		强调只有文字颜色一类的样式（color、 text-开头的、line-开头的、font-开头的）可以继承，盒子、定位布局的样式不能继承

