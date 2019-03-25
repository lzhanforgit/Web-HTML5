#DOM-2
1. 事件冒泡

	1. 什么叫事件冒泡

		1. 子元素发生事件
		2. 父元素也注册了相同事件
		3. 这时会触发执行父元素的事件行为
		4. 继续向上一级父元素冒泡，循环执行2，3，4.一直冒泡到顶级父元素：window
	2. 作用一
		子元素太多,可以把子元素事件统一冒泡到他们共同的父元素上。
	3. 作用二
		元素是动态添加的，可以可以把子元素事件统一冒泡到他们共同的父元素上。
	4. 弊端，解决事件冒泡

		1. 判断事件和this

			if(e.target==this){
                alert(this.nodeName);
            }
      2.  event.stopPropagation();

2. table-dom

	1. tbody
	2. tbody.rows
	3. tbody.rows[i].cells[j]
	
3. 保留两位小数

	num.toFixed(2);
	
4. **模板引擎-ES6**

	1. 字符串用反引号（··）
	2. 内部变量用${表达式}
	
			for(let good of skin_products){
	            tbody.innerHTML+=` <tr class="cart-good" id="${good.id}">
	                            <td><input type="checkbox" class="good-check" ${good.ischecked?"checked":''}></td>
	                            <td>
	
	                                <img src="${good.img_url}" alt="">
	                                <p>[极速免税]PITTA MASK 口罩3枚入</p>
	                                <p>型号：新版防晒款  容量：3枚入</p>
	
	                            </td>
	                            <td>${good.price}</td>
	                            <td>
	
	                                <input type="button" value="-"  ${good.number<=1?"disabled":''}>
	                                <input type="text" value="${good.number}">
	                                <input type="button" value="+">
	                            </td>
	                            <td>${good.price*good.number}</td>
	                            <td><a href="#">删除</a></td>
	                        </tr>`
	        }
5. 本地缓存
	
	html5中的Web Storage包括了两种存储方式：sessionStorage和localStorage。
	Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。


	1. sessionStorage
	2. localStorage
	3. cookie
	4. 方法

		1. setItem("key",value);
		2. getItem("key");
		3. removeItem('key');
		4. clear();