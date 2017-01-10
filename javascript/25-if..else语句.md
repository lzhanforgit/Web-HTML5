##if...else语句
又叫条件语句，用于基于不同的条件来执行不同的动作。该语句一定与boolean类型关联。

>通常在写代码时，您总是需要为不同的决定来执行不同的动作。您可以在代码中使用条件语句来完成该任务。
>
在 JavaScript 中，我们可使用以下条件语句：

1. if 语句 - 只有当指定条件为 true 时，使用该语句来执行代码
2. if...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
3. if...else if....else 语句 - 使用该语句来选择多个代码块之一来执行
4. switch 语句 - 使用该语句来选择多个代码块之一来执行

例如：

	if (条件){
	  	当条件为 true 时执行的代码
	  }
	else{
	  	当条件不为 true 时执行的代码
	  }
	
>条件必须为boolean类型的值

	if(a>12)...
	if(a>12 && a<100)...
	
当条件不是关系表达式或者逻辑表达式时

	var a=12;
	if(a)...//0 转化为false 非零为true
	
	var s='hello';
	if(s)...//''(空字符串)转化为false，非空字符串为true
	
	var f;
	
	if(f)...//f声明但没有初始化，所以f=undefined,undefined转化为false
	
	var o=null;
	
	if(o)...//o为引用类型，null转化为false,非null为true
	
多重条件时，注意：条件为多选一

	if (条件 1)
	  {
	  当条件 1 为 true 时执行的代码
	  }
	else if (条件 2)
	  {
	  当条件 2 为 true 时执行的代码
	  }
	else
	  {
	  当条件 1 和 条件 2 都不为 true 时执行的代码
	  }
	
