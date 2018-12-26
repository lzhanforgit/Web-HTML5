## unit2

1. ul

	无序列表
    1. 有两个标签：ul li
    2. ul li都是块级元素
    3. ul li都有外边距
    4. 列表项li和列表项标记分离
    5. ul:unordered list li:list item

2. ol

	1. ol:ordered list li:list item
		
	2. type

			<ol type='a/A/1/I'>
		
	> 列表的特点：结构简单、单一
	
3. 自定义列表

		<dl>
		    <dt>国家</dt>
		    <dd>中国</dd>
		    <dd>美国</dd>
		    <dt>周记</dt>
		    <dd>亚洲</dd>
		    <dd>美洲</dd>
		</dl>
		
		
	dl:defined list dt:defined titel dd:defined data
	
4. table

	1. table 块级元素 tr 块级元素 td 行内元素
	2. 控制表格：就是控制表格宽度、高度、对齐方式、行高、列宽、内容的位置、单元格合并

		1. 高度：height
		2. 宽度：width
		3. 对齐方式：align(横向对齐：left/right/center) valign（纵向对齐：top/middle/bottom）
		4. 表格合并：表格只能合并不能拆分

				列合并
				<td colspan="4">01</td>
				行合并
				<td rowspan="3">04</td>
				
		5. cellpadding="0" 单元格内边距
		6. cellspacing="5" 单元格外边距

		>cellpadding="0" cellspacing="5" 只能作为table标签的属性
	3. iframe

			<iframe src="pages/nav.html" frameborder="0" width="100%" height="200px"></iframe>
			
		iframe 是一个网页框架，它包含一个完整的网页结构
		
		
5. from

		<form action="" method="" id="user_login" name="myform" enctype="text/plain">
    
		</form>
		
	1. id一定是唯一的，name可以同名
	2. action:提交的目的地 
	3. method:提交的方式(get/psot/put/save/delete/...)，
	4. enctype：提交数据的格式

			enctype="text/plain"
			enctype="application/x-www-form-urlencoded"
			enctype="multipart/form-data"
	>表单提交其实就是提交form
	
6. 表单元素

	指定元素的类型。text、password、checkbox、radio、submit、reset、file、hidden、image 和 button，默认为 text

		<input type='....'>
	1. 表单元素是行内元素
	2. 表单的name属性是表单序列化的key值，就是说没有name属性则无法通过表单提交
	3. 注意：checked 属性比较特殊，只有一个值  属性的格式是：key="value" 
	4. 注意：要让多个radio处于同一个组，可以让他们的name值相同
	5. 按钮的value属性时按钮的标签
7. 下拉列表

		<form action="163.com" method="get" id="user_login" name="myform" enctype="multipart/form-data">

		    <select name="province" id="user_pro">
		        <option value="021">上海</option>
		        <option value="010">北京</option>
		        <option value="051">江苏</option>
		    </select>
		    <label for="user_pro">省</label>
		
		
			<!--用list属性关联下面的列表，注意是通过id关联-->
		    <input type="text" id="user_website" name="website" list="list_web">
		
		
			<!--定义一个列表-->
		    <datalist id="list_web">
		        <option value="163.com">网页</option>
		        <option value="baidu.com">百度</option>
		        <option value="yahoo.com">雅虎</option>
		    </datalist>
		
		
		
		    <input id="btn_submit" type="submit" value="login...">
		
		
		</form>

8. 表单元素状态属性

	readonly:	可以提交
	
		readonly="readonly"
	disabled： 不能提交数据
	
		disabled="disabled"
		
	
			