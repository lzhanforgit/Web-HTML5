0. markdown 语法

	https://www.jianshu.com/p/191d1e21f7ed
1. ws快捷键
	
	* 注释 ctrl+/
		
	* 复制当前行 ctrl+d
		
	* 删除当前行 ctrl+x
		
	* 功能键 tab

1. html4
	
	1999年发布html4.01
	
2. html4和html5的区别

	1. html4

			<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        	"http://www.w3.org/TR/html4/loose.dtd">
        	
   		1. DOCTYPE:document type

    	2. w3c: 万维网联盟，又称W3C理事会。1994年10月在麻省理工学院计算机科学实验室成立。建立者是万维网的发明者蒂姆·伯纳斯·李。

    	3. DTD:文档类型定义(Document Type Definition)是一套为了进行程序间的数据交换而建立的关于标记符的语法规则。它是标准通用标记语言和 [1]  可扩展标记语言1.0版规格的一部分

    	4. html4:html 4.01

    	5. Transitional: 过渡  它是dtd规则的执行标准
	
		    "http://www.w3.org/TR/html4/loose.dtd"：验证的地点
		
		    HTML 4.01 Strict
		    该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。
		
		    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
		    HTML 4.01 Transitional
		    该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。
		
		    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
		    "http://www.w3.org/TR/html4/loose.dtd">
		    HTML 4.01 Frameset
		    该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。
		
		    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
		    "http://www.w3.org/TR/html4/frameset.dtd">
	    
	    
	    ><!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。

    	><!DOCTYPE> 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。

    	>在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。

    	>HTML5 不基于 SGML，所以不需要引用 DTD。
    	
    1. html5

    	2013年发布
    	
    		<!DOCTYPE html>
    		<head>
    			<meta charset="UTF-8">
    			
    		...
    	
    3. meta

    		<meta http-equiv="Content-Type" content="text/html; charset=utf-8”>

			<meta name=“keywords” content=“驰星教育，IT项目培训" />

			<meta name=“description” content=“驰星教育，IT项目培训" />

    		<meta name="robots" content="index, follow" />
			<meta name="googlebot" content="index, follow" />
3. 重要的概念

 	1. html: hyper text markup language
 	2. http: hyper text transfer protocol
 	3. ftp: file transfer protocol
 	4. smtp: simple mail transfer protocol
 	5. chrome/ie/firefox/safari:浏览器 本质是文件阅读器
 	6. internet和www（world wide web）的关系
 	7. 网站由多个网页组成
 	8. 网页文件的后缀名是.html 或者 .htm
 	9. 网络访问的机制（c/s架构），就是client/server
 	10. URL(Uniform Resource Locator):统一资源定位器
 		
 		1.	协议名
 		2. 服务器名
 		3. 文件路径
 		4. 请求参数
 	11. 网页的结构

 		1. 结构层
 		2. 显示层
 		3. 行为层

 	12. 常用的前端ide

 		记事本、webstorm、hbuilder、notepad++、subline、VSCode、atom
4. 常用标签

	1. title
	2. h1...h6 块级元素
	3. p 块级元素
	4. br 
	5. hr 块级元素
	6. 加粗 strong 倾斜 em 行内元素
	7. 注释和特殊符号 

		空格 \&nbsp; 大于 \&gt; 小于 \&lt; 引号 \&quot;
	8. 常见的图片格式

		1. jpg/jpeg 网络图片
		2. gif 动图
		3. png 带透明背景
		4. bmp windows 自带图标类型
		5. WebP格式
			WebP是Google推出的一种图片格式，它基于VP8编码，可对图像大幅压缩。与JPEG相同，WebP也是一种有损压缩，但在画质相同的情况下，WebP格式比JPEG图像小40%。 Wiki 百度百科



	8. img 行内元素
	9. 相对路径和绝对路径

		1. ../
		2. ./
		3. /
	10. a 行内元素

		1. href
		2. target:_blank,_self
		3. onclick
		
	4. a 锚点链接

			<a name='mao'>...</a>
			
			<a href='#mao'>锚点文本</a>
			
	12. 关于超链接
        1. a标签并不表示超链接（也可能是一个锚点）
        2. 可以用超链接来实现页面刷新
        3. 如果超链接同时有单击事件，那么可以使href的值为#
