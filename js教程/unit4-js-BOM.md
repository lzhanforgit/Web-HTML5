#BOM
1. 事件触发机制

	1. 事件源：网页元素
	2. 事件
	3. 行为:函数	
2. 事件

	1. onload

			window.onload = function () {...
	2. onunload
	3. onbeforeunload

			window.onunload=function () {
		       console.log('here');
		    };
		
		    window.onbeforeunload=function (event) {
		        console.log('go....')
		    }
		  >注意不能用alert('sss');
	2. onchange

		当文本框失去焦点后并且文本的内容发生变化时，触发该事件
		
			var text1=document.getElementById('txt01');
            text1.onchange=function () {
                alert(text1.value);
            }
	3. onclick
	4. onfocus

	
		5. focus()
	5. onblur

	
		6. blur()
	6. onmouseover
	7. onmouseout

				<div class="divcss" id="div01"></div>
			    <div class="divcss" id="div02"></div>
			
			    <script>
			        var div01=document.getElementById('div01');
			        var div02=document.getElementById('div02');
			        div02.onmouseover=function () {
			            div02.style.background='red';
			//            div01.style.background='yellow';
			//            document.body.style.background='grey'
			        }
			        div02.onmouseout=function () {
			            div02.style.background='blue';
			//            div01.style.background='black';
			//            document.body.style.background='white'
			
			        }
			    </script>
	8. onkeypress
	9. onkeydown
	10. onkeyup

			  text1.onkeyup=function (event) {
                
			//                key表示按键的内容（区分大小写）
			                alert(event.key);
			//                keycode表示按钮的ascii码
			                alert(event.keyCode);
			//                回车的asci是13
			                if(event.keyCode==13){
			                    text1.blur();
			                }
			            }
	11. onerror
	12. onscroll

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
		
	**补充**
		
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
3. 闭合函数

		//            闭合函数
            (function (s) {
                alert('welcome'+s)
            })('javascript');
            
4. 事件处理机制方式

	
	1. 行内绑定
	2. 动态绑定
	3. 事件监听

			//ie
			 div02.addEventListener('mouseout',function (e) {
				//     div02.style.background='yellow';
	
	           e.target.style.background='yellow';
	      	 });
	
			//ie浏览器兼容
		    div02.attachEvent('mouseout',function (e) {
		
		       });
5.  BOM（Browser Object Model）即浏览器对象模型。
6. 短路原则

	1. &&

			 短路原则
        	window.confirm('确认关闭？') && window.close();
        		注意这里的括号不能少
        	txt && (txt.value='');
    }
	2. ||

			var b=a || 3;
7. 计时器

	1. setTimeout(func,time)/clearTimeout(t)
	2. setInterval()/clearInterval(inter)

				 var inter;
			    var txt;
			    document.getElementById('btn_begin').onclick=function () {
			        //记得要及时清除计时器
			        inter && clearInterval(inter);
						// 在bom当中元素查找是最大的开销
			        txt=document.getElementById('content');
			        inter=setInterval(function () {
			           txt.value+='1'
			        },1000);
			    };
			
			    document.getElementById('btn_stop').onclick=function () {
			        inter && clearInterval(inter);
			    }
			    document.getElementById('btn_clear').onclick=function () {
			        inter && clearInterval(inter);
			
			        txt && (txt.value='');
			    }
	3. 案例-倒计时
	
			label for="content">距离截止：</label>
			<input type="text" id="content">
			<script type="text/javascript">
			//    <!--闭合函数-->
			
			    (function keishi() {
			        var con=document.getElementById('content');
			        var end_time=new Date('2019-3-1');
			
			        var inter=setInterval(function () {
			            var now_time=new Date();
			            var time=end_time-now_time;
			            var v=number_to_time(time);
			            con.value=v;
			        },1000);
			    })();
			
			
			    function number_to_time(num) {
			        var num_second=num/1000;
			        var days=Math.floor(num_second/(60*60*24));
			        days=days>9?days:'0'+days;
			        var hours=Math.floor((num_second%(60*60*24))/(60*60));
			        hours=hours>9?hours:'0'+hours;
			        var minutes=Math.floor((num_second%(60*60))/60);
			        minutes=minutes>9?minutes:'0'+minutes;
			        var seconds=Math.floor(num_second%60);
			        seconds=seconds>9?seconds:'0'+seconds;
			        var result=days+" 天"+hours+' 时'+minutes+" 分"+seconds+" 秒";
			        return result;
			
			    }
			
			
			</script>
	
	4. 案例-轮播图
	5. js 单线程异步

		1. 异步

		
				function add(a,b) {
			        var c;
			        setTimeout(function () {  //e
			            c=a+b;
			            console.log('c=',c);
			        },1);
			
			        return c;
			
			    }
			
			    var res=add(1,2);  //d
			
			    console.log(res);  //结果为undefined
		2. 回调是解决异步的一种方案

				
				console.log('begin');  //a
				function add(a,b,callback) {
				    var c;
				    setTimeout(function () {  //b
				        c=a+b;
				        console.log('do....')
				        callback(c);
				    },1);
				
				}
				
				
				
				add(1,2,function (rec) {
				    console.log('开始播放',rec);
				});
				console.log('end');  //c
	5. Document对象的常用方法

		1. getElementById()
		2. getElementsByName()
		3. getElementsByTagName()
		4. getElementsByClassName()

		>后面三个方法得到的是NodeList,他是一个伪数组。
		
		5. querySelector('div:nth-child(2)')
		6. querySelectorAll('[class^="div01"]')

				 var p=document.querySelector('.div01-css').querySelector('p');
		
		>上面两个方法选择对象是用CSS里面的选择器。
	5. history

		1. back()
		2. forword()
		3. go

			go(1)==forward
			
			go(-1)==back()
			
			go(-2) // 后退两步
			
	6. location

		1. hostname/host
		2. href
			
			实现页面跳转（有历史记录）：
			
				location.href='./3-js-history-1.html';
				
		3. reload() 刷新页面
		4. replace() 替换当前页面--不会产生历史记录

				location.replace('./3-js-history-1.html');
	