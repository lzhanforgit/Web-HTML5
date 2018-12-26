# 布局
1. 标准文档流组成
	
	1. 块级元素（block  level）
		
			<h1>…<h6>、<p>、<div>、列表
		独占一行，可设置宽高，宽度默认和父级元素相同
	2. 内联元素（inline）
	
			<span>、<a>、<img/>、<strong>...
		水平排列，不可设置宽高，宽度根据内容而定
2. display 用于块级元素和行内元素的转化

	1. 隐藏元素：(none/block)
	
		display:none; 所在的位置被清空
		
		opacity: 0; 透明度为0，位置还在
		visibility: hidden; 同上
	2. 行内和块级元素转化

			display:block;
			display:inline;
			
		**行内元素水平间距（margin）不会重叠**
	
3. float

	1. float会脱离文档流
	2. float:left/right;
	3. margin不会折叠
	4. **高度塌陷**：容器子元素浮动导致容器高度变为零
	5. float可以实现文字环绕的效果

	总结
	
	1. 浮动元素脱离标准文档流
	
		1. 浮动元素的位置空出来，由非浮动元素占据
		1. 浮动元素不论是块级还是行级元素，都可以水平排列，同时设置宽度和高度
	1. 浮动元素具有相互贴靠特点
	1. 浮动元素具有文字围绕特点
	1. 浮动元素不设置宽度时具有收缩特点
	1. 父级元素的宽度是所有浮动子元素的宽度之和

	6. 清除浮动的方法

		1. clear:both
				
				.seperator{

		            clear: both;
		        }
				<div class="container">
		        <div class="div-css">1</div>
		        <div class="div-css">2</div>
		        <div class="div-css">3</div>
		        <div class="div-css">4</div>
		        <div class="seperator"></div>

   				 </div>
		2. 在塌陷的容器中加入overflow: hidden;
			
			overflow:visible/hidden/scroll/auto
			只要值不是visible就可以清除浮动
				
		3. 

4. postion
	
	1. static 默认，元素处于标准文档流中
	2. relative

		1. 居中
			
				margin:0 auto;
				left: 50%;
            	margin-left: -自身宽度的一半;
		2. 参考点是元素自己原来位置

		3. 偏移设置：top、left、right、bottom
		

	3. absolute

		1. 偏移设置： left、right、top、bottom 
		
		2. 居中不可以用margin:auto
		3. **参考点是非static父元素的左上角**,一般会把父元素设置为relative
		4. 当position: absolute;但是没有指定left或者top时，元素不动

	4. fixed

		1. 固定定位的参考点是浏览器窗口
		1. 固定定位元素脱离标准文档流
		1. Ie低版本不支持

	**会脱离文档流的是：float,position:absolute,postition:fixed**
5. 浏览器渲染引擎

	1、IE浏览器内核：Trident内核，也是俗称的IE内核；

	2、Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；
	
	3、Firefox浏览器内核：Gecko内核，俗称Firefox内核；
	
	4、Safari浏览器内核：Webkit内核；
	
	5、Opera浏览器内核：最初是自己的Presto内核，后来加入谷歌大军，从Webkit又到了Blink内核；
	
	6、360浏览器、猎豹浏览器内核：IE+Chrome双内核；
	
	7、搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；
	
	8、百度浏览器、世界之窗内核：IE内核；
	
	9、2345浏览器内核：好像以前是IE内核，现在也是IE+Chrome双内核了；
	
	10、UC浏览器内核：这个众口不一，UC说是他们自己研发的U3内核，但好像还是基于Webkit和Trident，还有说是基于火狐内核。
	
6. 页面渲染过程

	https://www.cnblogs.com/CandyManPing/p/6635008.html