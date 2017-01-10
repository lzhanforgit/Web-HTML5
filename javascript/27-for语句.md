##for 语句
如果您希望一遍又一遍地运行相同的代码，并且每次的值都不同，那么使用循环是很方便的。

例如
	
	var cars=['路虎','捷豹','宾利','道奇','东风','比亚迪']
	document.write(cars[0] + "<br>");
	document.write(cars[1] + "<br>");
	document.write(cars[2] + "<br>");
	document.write(cars[3] + "<br>");
	document.write(cars[4] + "<br>");
	document.write(cars[5] + "<br>");
	
如果用for
	
	for (var i=0;i<cars.length;i++)
	{
		document.write(cars[i] + "<br>");
	}
	
for 循环的语法：

	for (语句 1; 语句 2; 语句 3)
	  {
	  被执行的代码块
	  }
1. 语句 1 在循环（代码块）开始前执行,通常用于初始化循环变量
1. 语句 2 定义运行循环（代码块）的条件
1. 语句 3 在循环（代码块）已被执行之后执行，通常用于循环变量的改变

>语句1,语句2，语句3，都是是可选的，如：
	
	var i=0;
	for (;i<cars.length;i++)
	{
		document.write(cars[i] + "<br>");
	}
	
	或者
	
	for (var i=0,var len=cars.length;i<len;i++)
	{
		document.write(cars[i] + "<br>");
	}
	或者
	
	for (var i=0,var len=cars.length;i<len;)
	{
		document.write(cars[i] + "<br>");
		i++；
	}
##while do..while 语句
	
	var i=0;
	while(i<cars.length){
		document.write(cars[i] + "<br>");
		i++;
	}
	
do..while

	var i=0;
	do{
		document.write(cars[i] + "<br>");
		i++;
	}while(i<cars.length);