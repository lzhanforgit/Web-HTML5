#html5
1. 语义化标签

	header nav section article footer aside time main figure figcaption
2. 智能表单

	1. 文本表单

		1. type='email'
		2. type='url'
		3. type='number'

			<input type="number" max="100" min="0" step="5" value="10">

				<input type="number" max="100" min="0" step="5" value="10">
		4. type='search'
	2. 时间(type='date')

		<input type="date">
			
					<input type="date">


		
	3. 滚动条和进度条
		
		<input type="range" max="100" min="0" step="3" id="myrange" onchange="mypro.value=this.value">
			
			<input type="range" max="100" min="0" step="3" id="myrange" onchange="mypro.value=this.value">
	    
	    <progress value="20" min="0" max="100" id="mypro"></progress>

	    	<progress value="20" min="0" max="100" id="mypro"></progress>
	4. 颜色

			<input type="color">
			
	5. 智能表单属性

		1. required
		2. placeholder
		3. autofucus
		4. pattern
		5. novalidate

				<form  novalidate>
				
		6. checked
		7. readonly
		8. disabled

## css3
1. 属性选择器

		[ attr ]
		[ attr = â€œvalâ€œ]
		[ attr ^= â€œvalâ€œ]
		[ attr $= â€œvalâ€œ]
		[ attr *= â€œvalâ€œ]
		[ attr ï½ž= â€œvalâ€œ]

2. 兄弟选择器

	1. + 表示该元素下一个兄弟元素
	2. ~ 表示该元素后面所有的兄弟元素
3. 子选择器
	1. 空格 后代选择器
	2. \> 直接子元素选择器

			.section>div{...
4. 伪元素选择器

	1. :before
	2. :after
	3. ::selection

			.box{
           width: 50px;
           height: 50px;
           margin: 100px;
           background: black;
	       }
	
	        .box:before{
	            content: '';
	            display: block;
	            width: 0px;
	            height: 0px;
	
	            /*border-top:solid 50px red;*/
	            border-right:solid 50px rgba(223, 42, 255, 0);
	            border-bottom:solid 50px red;
	            border-left:solid 50px rgba(255, 255, 0, 0);
	            position: relative;
	            top:-50px;
	            left: -25px;
	
	        }
	
	       .box:after{
	           content: '';
	           display: block;
	           width: 20px;
	           height: 15px;
	           background: yellow;
	           position: relative;
	
	           top:-40px;
	           left: 15px;
	
	       }
	
	
	        .text{
	            width: 300px;
	            height: 40px;
	            border: solid 1px grey;
	            line-height: 40px;
	
	
	        }
	
	        .text::selection{
	            color: red;
	            background: blue;
	        }
5. 伪类选择器

	1. ：first-child

		选择父元素的第一个位置的元素
		
			section中第一个位置上的h1，如果第一个类型不是H1则选不中
			 .section>h1:first-child{
            color: red;
        	}
        	
       ：last-child 道理相同

	2. ：first-of-type

		选择父元素第一次出现的子元素
		
			section中第一次出现的h1，即使h1在第N个,但是只要是第一次出现
			 .section>h1:first-of-type{
            color: red;
        	}
		：last-of-type 道理相同
		
	3. ：only-child

		选择父元素中只有一个子元素
		
			选择DIV中只有唯一一个子元素并且元素类型为p
			div p:only-child
			
	4. ：nth-child(n)

		偶数行
		
			table tr:nth-child(2n/even){
	            background: red;
	        }
	   奇数行
	   
	   		table tr:nth-child(2n+1/odd){
	            background: red;
	        }
	   ：nth-last-child(n) 道理相同
	   
	5. :checked
	6. :disabled
	7. :readonly
	7. :default
	8. :selected
	9. :invaild/valid
	10. :out-of-range/in-range
	
			<style type="text/css">
	        input:disabled{
	            background: gray;
	            color: black;
	        }
	
	        input[type='button']{
	            width: 200px;
	            height: 50px;
	            background: red;
	            outline: none;
	            color: white;
	        }
	        input[type='button']:disabled{
	            background: rgba(252, 0, 0, 0.32);
	        }
	
	        #txt_id,.txt{
	            width: 200px;
	            height: 50px;
	        }
	
	        input:out-of-range{
	            background: red;
	        }
	
	        input:in-range{
	            background: green;
	        }
	
	        input:invalid{
	            background: yellow;
	        }
	    	</style>
	    
		    <form action="">
			        <input type="text" id="txt_id">
			
			
			        <input type="button" id="btn_login" value="login..." disabled>
			
			        <input type="number" max="100" min="0" class="txt">
			        <input type="email" max="100" min="0" class="txt">
			
			        <input type="text" pattern="\w{6,}" class="txt">
			</form>
	5. ：focus
	5. 浏览器兼容

			  -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -o-border-radius: 5px;
            -ms-border-radius: 5px;
            
    7. 示例网站
    
    	http://www.ghostchina.com/