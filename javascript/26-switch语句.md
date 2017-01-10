##switch 语句
switch 语句用于基于不同的条件来执行不同的动作。

先看语法结构
	
	switch (fruit) {
    case "banana":
        // ...
        break;
    case "apple":
        // ...
        break;
    default:
        // ...
	}

>上面代码根据变量fruit的值，选择执行相应的case。如果所有case都不符合，则执行最后的default部分。
>
<b style='color:red'>需要注意的是:

>每个case代码块内部的break语句不能少，否则会接下去执行下一个case代码块，而不是跳出switch结构。</b>
>
>这也是和if...elseif...语句不同的地方。
	
	var a=2;
	switch(a){
	    case 1:console.log('a==1');break;
	    case 2:console.log('a==2');;
	    case 3:console.log('a==3');;
	    case 4:console.log('a==4');;
	    default:console.log('end ...')
	}
	
	结果为
		a==2
		a==3
		a==4
		end ...
		
需要注意的是，switch语句后面的表达式与case语句后面的表示式，在比较运行结果时，采用的是严格相等运算符（===），而不是相等运算符（==），这意味着比较时不会发生类型转换。

	if(12=='12')...结果为true
	if(12==='12')...结果为false
	
	var a='2';
	switch(a){
	    case 1:console.log('a==1');break;
	    case 2:console.log('a==2');;
	    case 3:console.log('a==3');;
	    case 4:console.log('a==4');;
	    default:console.log('end ...')
	}
	
	结果为
		end ...
