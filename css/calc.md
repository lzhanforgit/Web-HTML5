### CSS3的CALC使用

1. 为了解决撑破容器的问题，以前我们只能去计算div.box的宽度，用容器宽度减去padding和border的值，但有时候，我们苦于不知道元素的总宽度，比如说是自适应的布局，只知道一个百分值，但其他的值又是px之类的值，这就是难点，死卡住了。随着CSS3的出现，其中利用box-sizing来改变元素的盒模型类型实使实现效果，但今天我们学习的calc()方法更是方便。

   知道总宽度是100%，在这个基础上减去boder的宽度（5px * 2 = 10px）,在减去padding的宽度（10px * 2 = 20px），即"100% - (10px + 5px) * 2 = 30px" ，最终得到的值就是div.box的width值：

    ```
    .demo {
    	width: 300px;
    	background: #60f;
    	padding: 3px 0;
    }
    .box {
    	background: #f60;
    	height: 50px;
    	padding: 10px;
    	border: 5px solid green;
    width: 90%;/*写给不支持calc()的浏览器*/
    	width:-moz-calc(100% - (10px + 5px) * 2);
    	width:-webkit-calc(100% - (10px + 5px) * 2);
    	width: calc(100% - (10px + 5px) * 2);
    }
    ```

> 注意

    * 使用“+”、“-”、“*” 和 “/”四则运算；

    * 可以使用百分比、px、em、rem等单位；

    * 可以混合使用各种单位进行计算；

    * 表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；

    * 表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。
