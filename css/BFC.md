#BFC

0. box,Formatting Context

	在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。

	1. Box: CSS布局的基本单位

		Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

		* block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
		* inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
		* run-in box: css3 中才有， 这儿先不讲了。

	2. Formatting context

	
		　　Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。
	
	　　	CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。
	　　	[参考文章](https://www.jianshu.com/p/e75f351e11f8
)
　　	
1. 什么是BFC
 	
 	
	
	在一个Web页面的CSS渲染中，块级格式化上下文 (Block Fromatting Context)是按照块级盒子布局的。W3C对BFC的定义如下：

	浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。
	为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：

	1、float的值不是none。
	
	2、position的值不是static或者relative。
	
	3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
	
	4、overflow的值不是visible
	
	BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
	
	**IFC布局规则：**
	
	IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
	在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 margin，border 和 padding在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。
	
	那么IFC一般有什么用呢？
	
	水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
	
	垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。
		
		 .container{
            background: grey;
            text-align: center;
            height: 400px;
            width: 800px;
            display: table-cell;
            vertical-align: middle;


        }

        .column {
            width: 200px;
            height: 50px;
            background-color: green;
            display: inline-block;
            
        }

	**BFC布局规则：**
	1. 内部的Box会在垂直方向，一个接一个地放置。
	1. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
	1. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
	1. BFC的区域不会与float box重叠。
	1. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
	1. 计算BFC的高度时，浮动元素也参与计算
2. 怎么创建BFC

	要显示的创建一个BFC是非常简单的，只要满足上述4个CSS条件之一就行。例如：
	
		<div class="container">
		  你的内容
		</div>
	在类container中添加类似 overflow: scroll，overflow: hidden，display: flex，float: left，或 display: table 的规则来显示创建BFC。虽然添加上述的任意一条都能创建BFC，但会有一些副作用：
	
	1、display: table 可能引发响应性问题
	2、overflow: scroll 可能产生多余的滚动条
	3、float: left 将把元素移至左侧，并被其他元素环绕
	4、overflow: hidden 将裁切溢出元素
	
	因而无论什么时候需要创建BFC，都要基于自身的需要来考虑。对于本文，将采用 overflow: hidden 方式：
	
		.container {
		    overflow: hidden;
		}
		
3. BFC可以做什么呢？

	1. 利用BFC避免外边距折叠

		BFC可能造成外边距折叠，也可以利用它来避免这种情况。BFC产生外边距折叠要满足一个条件：两个相邻元素要处于同一个BFC中。所以，若两个相邻元素在不同的BFC中，就能避免外边距折叠。
		
			<head>
			    <meta charset="UTF-8">
			    <title>bfc</title>
			    <style>
			        body,ul,p,li{
			            margin: 0;
			            padding: 0;
			        }
			        .container{
			            width: 800px;
			            height: 700px;
			            background: grey;
			            float: left;
			        }
			
			        .container p{
			            width: 200px;
			            height: 100px;
			            margin: 50px;
			            background: yellow;
			        }
			
			        .p3_container{
			            overflow: hidden;
			        }
			    </style>
			</head>
			<body>
			    <div class="container">
			        <p>p1</p>
			        <p>p2</p>
			        <div class="p3_container">
			            <p>p3</p>
			        </div>
			    </div>
			</body>
	
	2. BFC包含浮动(解决高度塌陷)(计算BFC的高度时，浮动元素也参与计算)

	
		浮动元素是会脱离文档流的(绝对定位元素会脱离文档流)。如果一个没有高度或者height是auto的容器的子元素是浮动元素，则该容器的高度是不会被撑开的。我们通常会利用伪元素(:after或者:before)来解决这个问题。BFC能包含浮动，也能解决容器高度不会被撑开的问题。
		
	3. 使用BFC避免文字环绕(BFC的区域不会与float box重叠)

		对于浮动元素，可能会造成文字环绕的情况(Figure1)，但这并不是我们想要的布局(Figure2才是想要的)。要解决这个问题，我们可以用外边距，但也可以用BFC。
		
			 .container{
	            width: 800px;
	            height: 700px;
	            background: grey;
	            float: left;
        	}
			<div class="container">
       
		        <div class="img-container"><img src="../images/square-02.png" alt=""></div>
		        <p>        First let us understand why the text wraps. For this we have to understand how the box model
		            works when an element is floated. This is the part I left earlier while discussing
		            the alignment in a block formatting context. Let us understand what is happening in
		            Figure 1 in the diagram below:
		        </p>
		    </div>
		    
		造成文字环绕的原因
		
		在BFC上下文中，每个盒子的左外侧紧贴包含块的左侧（从右到左的格式里，则为盒子右外侧紧贴包含块右侧），甚至有浮动也是如此（尽管盒子里的行盒子 Line Box 可能由于浮动而变窄），除非盒子创建了一个新的BFC（在这种情况下盒子本身可能由于浮动而变窄）。
		因而，如果p元素创建一个新的BFC那它就不会再紧贴包含块的左侧了。
		
	4. 在多列布局中使用BFC

		如果我们创建一个占满整个容器宽度的多列布局，在某些浏览器中最后一列有时候会掉到下一行。这可能是因为浏览器四舍五入了列宽从而所有列的总宽度会超出容器。但如果我们在多列布局中的最后一列里创建一个新的BFC，它将总是占据其他列先占位完毕后剩下的空间。
		
			例如：

			<div class="container">
			    <div class="column">column 1</div>
			    <div class="column">column 2</div>
			    <div class="column">column 3</div>
			</div>
			对应的CSS：
			
			.column {
			    width: 31.33%;
			    background-color: green;
			    float: left;
			    margin: 0 1%;
			}
			/*  Establishing a new block formatting 
			    context in the last column */
			.column:last-child {
			    float: none;
			overflow: hidden; 
			}