# 样式属性
1. font-family

	由于同一字体有不同的称呼，同一字体还有很多的变形字体。所以CSS2定义了5中字体系列。

	* Serif
	* Sans-Serif
	* Monospace
	* Cursive
	* Fantasy

	
			font-family: ..., "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif; 
	
	为什么不把中易宋体（SimSun）、华文黑体（STHeiti［10.6 之前］或 Heiti SC［从 10.6 开始］） 和 Droid Sans 写出来？因为它们是系统默认字体， 以上字体都没有的话就会自动调用。除非你的用户中很多人的系统 locale 都不是中文， 否则不必写出 STHeiti 之类（如果要写，请把它写在 Hiragino Sans GB 和 Microsoft YaHei 中间）。 中易宋体（SimSun）尽管身为宋体，在 Windows 中却也是简体中文的默认 sans-serif 字体。


2. font-size

	默认字体大小是12px
	
	单位
	
	1. px
	2. em

		* 相对父元素字体的大小
		
		* font-size属性可以继承

	3. rem

		相对于根元素（html标签）的字体大小
		
3. font-weight

	不是所有的字体都支持加粗
	
	属性的值：100-900 normal bold bolder lighter inherit
	
4. text-align

	1. 是用来解决元素内部的子元素的位置（left/center/right）
	2. 只能解决行内元素

5. line-height（实现文本等行内元素垂直居中）

	可以通过设置行高和元素的高度一致，来实现文本垂直居中
	
		 .div01-css{
            width: 300px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;  /*和height: 80px;保持一致*/
        }
        
7. vertical-algin（实现文本等行内垂直居中）


		.div02-css{
            width: 300px;
            height: 80px;
            font-size: 1.2em;
            text-align: center;
            <!-- vertical-align要可用必须用在table的单元格中-->
            vertical-align: middle;
            
            <!--把div转化为单元格-->
            display: table-cell;
        }
6. text-decoration: none; 实现去除超链接的下划线
7. a 伪类

		 a:link{
            color: red;
        }
        a:visited{
            color: yellow;
        }
        /*hand over*/
        a:hover{
            color: black;
        }
        a:active{
            color: aqua;
        }
	
	>：hover不仅可以用在超链接，可以用在所有具备鼠标悬停的元素上
	
8. cursor

	改变鼠标光标的外观
	
9. background

	1. 如果背景色和背景图片同时存在则要先写背景色

			  width: 300px;
            height: 200px;
            background: gray;
            background-image: url("../images/square-02.png");
            background-repeat: round;
            
   2. background-image:url("")
   3. background-repeat:no-repeat/repeat/repeat-x/repeat-y/round/space
   4. background-position:center center;

   		CSS Sprites

		　　CSS Sprites在国内很多人叫css精灵，是一种网页图片应用处理方式。它允许你将一个页面涉及到的所有零星图片都包含到一张大图中去，这样一来，当访问该页面时，载入的图片就不会像以前那样一幅一幅地慢慢显示出来了。对于当前网络流行的速度而言，不高于200KB的单张图片的所需载入时间基本是差不多的，所以无需顾忌这个问题。
   5. background-size:contain/cover

   		size只是临时方案，根本解决的思路应该是和设计人员沟通，改变图片的尺寸！！！
   6.  background-origin: padding-box;

   		设置背景图片的对齐方式
   		
   		border-box:背景图片左上角和边框左上角对齐
   		padding-box:背景图片左上角和内边距左上角对齐
   		content-box:背景图片左上角和内容左上角对齐
   		
   	7. background-clip: content-box/border-box/content-box;
   	8. 补充：图片作为元素充满div

   				<div class="div02-css">
       		 <a href="0-css继承.html"><img src="../images/1.jpg" alt=""></a>
    			</div>
    			
    			
    			css
    			
    			.div02-css{
		            width: 400px;
		            height: 250px;
		            overflow: hidden;
		        }
		
		        .div02-css img{
		            width: 100%;
		            height: 100%;
		            object-fit: cover;
		        }
10. padding

			padding-left 
			padding-right
			padding-top
			padding-bottom
			padding: /*上 右 下 左*/
			 /*上下，左右*/
       		padding: 20px 30px;
		
	**box-sizing: border-box**
	
	>样式中width,height只是box的内容宽度和高度
	

11. border

	1. 边框包括：样式、粗细、颜色（分为上、右、下、左）

			.div01-css{
            width: 200px;
            height: 100px;
            border-top: dotted 5px red;
            border-right: double 5px blue;
            border-bottom: solid 5px green;
            border-left: solid 5px black;
        }
	2. 
12. margin

		margin-top
		margin-right
		margin-bottom
		margin-left
		margin:上 右 下 左
		
		margin:上下 左右
		
	margin会发生重叠效果
	
	可以通过margin:0 auto;实现块级元素居中。
	
	box实际尺寸=margin+border+padding+content
	通常所说的width属性其实就是content的宽度


13. ddd