#DOM-1
1. this

	1. this 所在的函数
	2. 函数被对象调用
	3. this就是这个对象

	在事件触发机制里我们可以使用eventlistner
	
		this==event.target // 目前是true
		
	**this会和内部函数发生冲突**
	
			var that=this;  //解决this和内部冲突
              var timeout=window.setTimeout(function () {
                  var con=this.innerText;
		//         目前this 是window对象
		//         alert(this==window);

                  alert(that.innerText);
                  clearTimeout(timeout);
              },1000);	
	
	//          解决方案二:利用=>表达式
	
	=>表达式 不是函数所以内部没有this，它也没有作用域。

            var timeout=window.setTimeout(()=> {
                alert(this.innerText);
                clearTimeout(timeout);
            },1);
            
            
    4. 补充

    		console.log(c); //c is not definef
    		console.log(window.c);  //undefined
    		
    	而下面：
    	
    		 var c=1;
		    console.log(window.c);   //1
		    console.log(c);          //1
		    console.log(c===window.c);  //true

2. DOM(Document Object Model)

	补充：
	
	1. getElementsByClassName()

		HTML5 DOM中新增
		
			  <div class="sale important"></div>

			下面几种方法都可以获取dom
		    <script>
		        div=document.getElementsByClassName('sale')[0];
		        div=document.getElementsByClassName('important')[0];
		        div=document.getElementsByClassName('sale important')[0];
		        div=document.getElementsByClassName('important sale')[0];
		
		        div.innerHTML='hello'
		    </script>
		    
	2. 超链接的href和onclick(先执行onclick 然后是 href)

		阻断href执行
		
			<a href="baidu.com" onclick="alert(this.href);return false;">baidu.com</a>
3. 动态改变文档内容的原理


	1、解析文档（如HTML）并生成DOM树
	
	2、通过DOM标准接口+编程语言改变文档内容
4. 节点

	1. nodeName属性

	
		nodeName 是只读的
		
		元素节点的 nodeName 与标签名相同
		
		属性节点的 nodeName 与属性名相同
		
		文本节点的 nodeName 始终是 #text
		
		文档节点的 nodeName 始终是 #document
		
	2. nodeValue属性

		元素节点的 nodeValue 是 undefined 或 null
		
		文本节点的 nodeValue 是文本本身
		
		属性节点的 nodeValue 是属性值
		
	3. nodeType属性

		元素节点：1
		属性节点：2
		文本节点：3
		注释节点：8
		文档节点：9
		
	4. 元素（type=1）的常用属性

		1. tagName(和nodeName相同)
		2. innerHTML/innerText
		3. id
		4. style -style属性加入的是行内样式
		5. className

				//注意bg前面的空格
				container.className+=' bg-color';
				
		6. classList

			1. add('class');
			2. remove('class')
			3. containes('class') //true/false
			4. item(index) //获取元素的第几个样式名称
			5. toggle('class') //动态添加、删除样式

					.hidden{
			            display: none;
			        }
        
        			document.querySelector('#btn_toggle').onclick=function () {
			            container.classList.toggle('hidden');
			        }
			        
	5. 关于组合样式选择

		1. querySelector

					<div class="container bg-color" id="container">

				    </div>
				
				
				    <script>
				    var con=document.querySelector('.container');
				    var con=document.querySelector('.bg-color');
				//      var con=document.querySelector('.container.bg-color');
						//等价于下面的方式
				      var con=document.querySelector('.bg-color.container');
				      con.style.background='blue';
				    </script>
		
		2. getElementsByClassName

					var con=document.getElementsByClassName('container')[0];
					var con=document.getElementsByClassName('bg-color')[0];
		        	var con=document.getElementsByClassName('container bg-color')[0];
		        	var con=document.getElementsByClassName('bg-color container')[0];

3. 查找节点

	1. 子节点

		1. childNodes-查找元素的**直接**子节点

			* 查找的结果为节点列表（nodeList），包含元素内部的所有类型的节点。
			* childNodes可以连续查找
				 	var input=container.childNodes[2].childNodes[0];
		2. children  -查找元素的**直接**子元素节点

				var input=container.children[1].children[0];
		3. childElementCount == container.children.length
		4. firstChild ==childNodes[0]/lastChild
		6. firstElementChild/lastElementChild

	2. parentNode 

		直接父元素
		
			container.parentNode.parentNode
			
			html.parentNode //#document
			document.parentNode //null
			
		利用递归实现一个元素的所有父元素
		
			var nodes=[];
			function parents(obj) {
			    if(obj.nodeName.toLowerCase()=='#document'){
			        return obj;
			    }
			    parents(obj.parentNode);
			    nodes.push(obj);
			}
	4. 补充递归

		实现1+2+3+...10
		
			arr=[];
			function add(n) {
			    if(n==1){
			        return 1;
			    }
			    t=n+add(n-1);
			    arr.push(t);
			    return t;
			}
		
		实现斐波那契数列
		
			function fib(n) {
			    if(n<=2){
			        return 1;
			    }
			
			    return fib(n-1)+fib(n-2);
			}
			
		改进版的
		
			var cache = [];
			function fib(n){
			    if(cache[n] !== undefined){
			        return cache[n];
			    }
			    if(n <= 2){
			        cache[n] = 1;
			        return 1;
			    }
			    cache.push(fib(n - 1) + fib(n - 2));
			    return cache[n];
			}
	3. 兄弟节点

		1. nextSibling -下一个兄弟节点
		2. nextElementSibling -下一个兄弟元素节点
		3. previousSibling
		4. previousElementSibling

		
				//返回该元素的所有兄弟节点
				function siblings(obj) {
		            var brs=[];
		            var nodes=obj && obj.nodeType && obj.parentNode.children;
		            for(var node of nodes){
		                if(node!=obj){
		                    brs.push(node);
		                }
		            }
		
		            return brs;
		        }
		
				//返回该元素的所有前兄弟节点
		        function previousSiblings(obj) {
		            var brs=[];
		            var nodes=obj.parentNode.children;
		            for(var node of nodes){
		
		                if(node==obj){
		                    break;
		                }
		                brs.push(node);
		            }
		            return brs;
		        }
				//返回该元素的所有后兄弟节点
		        function nextSiblings(obj) {
		            var brs=[];
		            var nodes=obj.parentNode.children;
		            var ispush=false;
		            for(var node of nodes){
		
		                if(ispush){
		                    brs.push(node);
		                }
		                if(node==obj){
		                    ispush=true;
		                }
		
		            }
		            return brs;
		        }
4. 创建和增加节点

	1. createElement（）：创建节点  
	2. createTextNode（string）：创建文本节点
	3. appendChild（）：末尾追加方式插入节点
	4. insertBefore（）：在指定节点前插入新节点
	5. cloneNode（true）：克隆节点,true表示深度复制
	6. document.createDocumentFragment() 创建一个虚拟容器节点

			<ul id="city">
		        <li id="suzhou">苏州</li>
		    </ul>
		
		    <script>
		        var cities=[
		            {name:"南京",id:"nanjing"},
		            {name:"无锡",id:"wuxi"},
		            {name:"南通",id:"nantong"},
		            {name:"常州",id:"changzhou"},
		        ]
		
		        var ul_city=document.querySelector('#city');
		
		        //        创建模板li
		        var li=document.createElement('li');
		        var txt=document.createTextNode('');
		        li.appendChild(txt);
		        //        创建一个虚拟容器
		
		        var df=document.createDocumentFragment();
		
		        for(var c of cities){
		        //            克隆模板li
		            var nli=li.cloneNode(true);
		
		            nli.setAttribute('id',c.id);
		            nli.childNodes[0].nodeValue=c.name;
		            df.appendChild(nli);
		        }
		
		        ul_city.appendChild(df);
		
		    </script>
	4. 删除节点

				var rc=document.querySelector('ul>li');

        		ul_city.removeChild(rc);
        		
   4. 清空内部节点

   			  	ul_city.innerHTML='';
   			 
	5. 替换节点

		replaceChild(newnode,oldnode)
		
			var nli=document.createElement('li');
	        var ntxt=document.createTextNode('徐州');
	
	        nli.appendChild(ntxt);
	        var lc=document.querySelector('ul>li:last-child');
	
	
	        ul_city.replaceChild(nli,lc);

2. 样式

	1. offsetWidth: box可视宽度（padding+border+width）

		**样式中width属性其实是content的宽度**
	2. clientWidth: (padding+width)
	3. clientLeft: border的宽度
	4. offsetLeft

		1. 相对于非static父元素（如果没有找到父元素则相对于body）
		2. 计算是可见的间距(包括margin,父元素padding,left)

	5. offsethHeight/clientHeight/clientTop/offsetTop 

3. 事件坐标

	1. event.clientX: 相对于document的水平坐标
	2. event.offsetX: 相对于事件源的水平坐标

3. **补充**
	
	谷歌不识别document.documentElement.scrollTop，必须要加上document.body.scrollTop；
		
		即
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;

			window.onscroll = function () {
			  var t = document.documentElement.scrollTop || document.body.scrollTop;
			  if ( t >= 50 ) {
			    console.log( t )
			    document.getElementById( "div1" )
			      .style.display = "inline";
			  } else {
			    document.getElementById( "div1" )
			      .style.display = "none";
			  }
			}
			
	对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari： 
	
	window.innerHeight - 浏览器窗口的可见高度 
	window.innerWidth - 浏览器窗口的可见宽度 
	
	对于 Internet Explorer 8、7、6、5： 
	document.documentElement.clientHeight 
	document.documentElement.clientWidth 
	或者 
	document.body.clientHeight 
	document.body.clientWidth 
	
	兼容所有浏览器： 
	
	var w=window.innerWidth 
	|| document.documentElement.clientWidth 
	|| document.body.clientWidth;

		window.onscroll = function(){
        var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）

        console.log('a=',a);
        console.log('b=',b);
        console.log('c=',c);
    	}

		