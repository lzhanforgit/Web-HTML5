#mock.js
1. 安装

	[官网](http://mockjs.com/)
	
	1. 下载js文件

			npm install mockjs
			
			npm uninstall mockjs
	2. 导入CDN

		打开CDN网站https://www.bootcdn.cn/，搜索Mock.js
		
		在页面中导入
		
			<script src="https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js"></script>
			
2. 生成数据

		/**
		 * Created by lzhan on 2019/1/8.
		 */
		
		var Random = Mock.Random;
		Random.boolean(2, 8, true);
		Random.extend({
		    authornames: function() {
		        var name = ['张伟', '李丽','王东','张忠','司马光','许王鹏','李国炽'];
		        return this.pick(name)
		    },
		    stars:function () {
		        var names = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
		        return this.pick(names);
		    }
		});
		Random.authornames();
		Random.stars();
		
		Mock.mock('http://jobapp.com/getarticle', {
		    'name'     : '@name',
		    'age|1-100': 1,
		    'color'    : '@color',
		    'number3|123.3': 1
		});
		
		
		Mock.mock('http://jobapp.com/getarticles', {"articles|10":[
		
		    //文章的模板
		    {
		        // "id": 'book_' + '@integer(1, 1000)',
		        // "id": 'book_' + Random.increment(1),
		        "id": 'book_' + '@increment',
		        "guid":"@guid",
		        "name": "@cword(4)",
		        "author": '@authornames',
		        "star":"@stars",
		        "price|1-100.2": 1,
		        // "publish_date": Random.date('yyyy-MM-dd'),
		        // "publish_date": Random.datetime(),
		        "publish_date": '@datetime',
		        'email': '@email',
		        "comments_acount|10000-100000": 1,
		        "sall_type|1-10": 1,
		        "icon": "book01.jpg",
		        "count|1-100": 1,
		        "comments": "@cparagraph(2, 7)",
		        "isSelected": '@boolean',
		
		
		    }
		]});
		
3. 调用数据

	1. 定义ajax

			function getData(url,cb) {
			    var oAjax = null;
			    oAjax = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
			    oAjax.open('get',url,true);
			    oAjax.send(null);
			    oAjax.onreadystatechange=function(){
			        if(oAjax.readyState==4){
			            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
			                var con=JSON.parse(oAjax.responseText);
			                cb(con);
			            }else{
			                window.sessionStorage.setItem('status',oAjax.status);
			                window.sessionStorage.setItem('statusText',oAjax.statusText);
			                location.href='pages/404.html';
			            }
			        }
			    }
			}
	2. 请求

			getData('http://jobapp.com/getarticles',function (data) {
            console.log(data);
        	})