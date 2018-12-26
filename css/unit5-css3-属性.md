#css3 属性
0. 透明度

		img {
	        filter: alpha(opacity=50);
	        opacity: 0.5;
	    }
1. 文字阴影

	text-shadow:x,y,羽化值，颜色;
	
		text-shadow:3px,3px,5px,red
		多重阴影
		text-shadow:3px,3px,5px,red,text-shadow:3px,3px,15px,blue;
2. 盒阴影

	box-shadow:x,y,羽化值，颜色;
	
	box-shadow:x,y,羽化值，阴影宽度，颜色;
		
		box-shadow: 0px 0px 0px 15px black;
		
3. 长单词与URL自动换行—wordwrap

			word-wrap: break-word;
4. 使用服务器端字体@font-face

	使用方法
	1. 定义一个自定义字体

			 @font-face {font-family: 'myfont';
	            src: url('../fonts/webfont.eot'); /* IE9*/
	            src: url('../fonts/webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
	            url('../fonts/webfont.woff') format('woff'), /* chrome、firefox */
	            url('../fonts/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
	            url('../fonts/webfont.svg#webfont') format('svg'); /* iOS 4.1- */
	        }
	2. 使用字体

			 font-family: myfont;
			 
5. 盒的类型 display

	1. display:inline/block/none
	2. display:inline-block(注意这个时候，有行高)
	3. dispaly:table-cell(内容元素可以使用vertical-align实现垂直居中)
	4. display:list-item

6. box-sizing:content-box/border-box
7. 弹性布局

	display:flex
	
	1. 在父元素中加入display:flex实现内部子元素flex布局，其实默认布局方向是行（flex-direction: row;）
	2. 如果布局方向为行，那么子元素的默认高度和父元素高度相同；如果布局方向为列，那么子元素宽度和父元素宽度相同。
	2. 在子元素中加入flex:1实现子元素权重
	3. 如果其中一个子元素有width:300px,则表示父元素的宽度减去当前的300px，然后其他子元素根据权重平分
	4. 主轴对齐方式 

			justify-content: flex-start/center/flex-end/space-between/space-around;
			
	5. 交叉轴对齐方式

			align-items: flex-start/center/flex-end;
			
	6. 自动换行

		flex-wrap: wrap/no-wrap;
		
	7. 常用设备尺寸

		1. 高清屏：1170-
		2. 普通屏：970-1170
		3. 平板：750-970
		4. 手机：-750
	
5. 过度效果-transform

		transform:rotate(45deg) scale(x,y) shew(x,y) translate(x,y)
		transform-oragin:center,center
		
		触发过度效果
		div:hover{}
		div:focus{}
		
	demo
	
				<style type="text/css">
		        .container div{
		            width: 300px;
		            height: 300px;
		
		
		        }
		
		        .container .bottom{
		            background: url("../images/1.jpg");
		            background-size: cover;
		            background-position: center;
		        }
		
		        .container .top{
		            position: relative;
		            top:-300px;
		            /*transform: translate(0px,-100%);*/
		            font-size: 3em;
		            color: rgba(255, 255, 255, 0);
		            text-align: center;
		            line-height: 300px;
		
		            transform-origin: center;
		            transition: background 1s,color 1s,border-radius 1s,transform 1s;
		
		
		        }
		        .container .top:hover{
		
		            background: rgba(0, 0, 255, 0.28);
		            color: white;
		            border-radius: 50%;
		            transform: scale(0.5,0.5);
		        }
		    </style>
		</head>
		<body>
		    <div class="container">
		        <div class="bottom"></div>
		        <div class="top">探索宇宙</div>
		    </div>
		</body>
		
10. 媒体查询

	1. 在内部样式表中

			<style type="text/css">

	        .container{
	            height: 400px;
	        }
	        /*<!--当屏幕宽度大于1024px是适用下面样式-->*/
	        @media screen and (min-width: 800px) {
	            .container {
	                width: 100%;
	                background: red;
	
	            }
	        }
	
	        @media screen and (min-width: 700px) and (max-width: 800px) {
	            .container {
	                width: 80%;
	                margin: auto;
	                background: #0000ff;
	
	            }
	        }
	    </style>
	    
	2. 外部样式表

			link rel="stylesheet" href="css/apple.css">
		    <link rel="stylesheet" media="screen and (min-width:970px)" href="css/apple_min_970.css">
		    <link rel="stylesheet" media="screen and (min-width:750px) and (max-width:970px)" href="css/apple_750_970.css">
		    <link rel="stylesheet" media="screen and (max-width:750px)" href="css/apple_max_750.css">
	  
11. 渐变

	1. 线性渐变


				默认垂直方向两种颜色过度
			  background: linear-gradient(#fb3, #58a);
			  
			  	默认垂直方向两种颜色过度（高度从20%到50%）
            background: linear-gradient(#fb3 20%, #58a 50%);
            	倾斜30度渐变
            background: linear-gradient(30deg,#fb3 20%, #58a 50%,#ffff00 100%);
             不发生渐变的情况
            background: linear-gradient(rgba(255, 187, 51, 0) 30%, #58a 20%, #58a 50%, rgba(255, 255, 0, 0) 0%);
        }

	2. 径向渐变

			background: radial-gradient(rgba(255, 187, 51, 0) 30%, #58a 20%, #58a 50%, rgba(255, 255, 0, 0) 0%);
			
12. 动画

	1. 定义动画

			 /*@keyframes myfirst*/
	        /*{*/
	            /*from {background: red;}*/
	            /*to {background: yellow; margin-left: 200px}*/
	        /*}*/
	
	        @keyframes myfirst
	        {
	            0%   {background: red; left:0px; top:0px;}
	            25%  {background: yellow; left:200px; top:0px;}
	            50%  {background: blue; left:0px; top:200px;}
	            75%  {background: green; left:200px; top:200px;}
	            100% {background: red; left:0px; top:0px;}
	        }

	2. 使用动画

	
			.div01{
	            width: 100px;
	            height: 100px;
	            background: red;
	            position: fixed;
				
	        }
	
	        .div01:hover{
	            animation: myfirst 2s;
	        }
		