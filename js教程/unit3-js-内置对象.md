#js 内置对象
1. Array
	
	1. concat 数据相加

			var arr1=[1,2,3];
			var arr2=[5,7,9];
			var arr0=[0,0,0];
			var arr3=arr1.concat(arr2,arr0);
		
		>如果用+，则是把多个数组转换为字符串然后执行字符串相加。

	2. join

	
			var s1=arr1.join('-');

	3. slice(begin,end)

		截取数组中从起始位置，到终止位置之前的子数组
		
			var arr4=arr1.slice(2,5); // 位置为2-4
			
		slice(2) 表示截取位置2到结尾所有的元素
		
		slice(2,-1) 表示截取位置2到倒数第二个元素（因为不包含-1位置的元素）
	4. splice(begin,length)

			var arr5=arr1.splice(2,4); //移除位置2开始后面的4个元素
			var arr5=arr1.splice(2,4,9,9,9);  //用9，9，9替换位置2开始后面的4个元素
			
			console.log(arr1);
			
			console.log(arr5);
			
		**数组去重**
		
			for(var i=0,len=arr6.length;i<len;i++){
			    for(var j=i+1;j<=len;j++){
			        if(arr6[i]==arr6[j]){
			            arr6.splice(j,1);
			            len--;
			            j--;
			        }
			    }
			}

	5. sort()

			var arr7=[1,2,2,21,2,3,52,300,3,3,6,7,2,2,2];

			//sort()是用来排序字符
			// arr7.sort();
			
			arr7.sort(function (a,b) {
			    // return a-b;
			    return b-a;
			})
			
	6. reverse()反转
	7. pop() shift() push() unshift()

			var array8=[1,2,3,4,5,6]

			var a=array8.pop();
			
			console.log(a);
			console.log(array8);
			
			var b=array8.shift();
			
			console.log(b);
			console.log(array8);
			
			
			// var c=array8.push(7);  //c为新数组的长度
			// var c=array8.push(8);
			// var c=array8.push(8,9,10);
			
			var arr=[8,9,10];
			
		**//ES6 ...可以把数组拆开**
		
			var c=array8.push(...arr);
			
			console.log(c);
			
			console.log(array8);
			
			var d=array8.unshift(0); //d为新数组的长度
			
			console.log(d);
			
			console.log(array8);
	
	7. indexof(5)

		varindex=arr.indexof(5)
		
		index返回的是5在arr中的位置，如果没有5返回-1；
		
			
	        //从头遍历元素在数组中的位置，如果没有找到则返回-1
	        var arr=['hao','hi','hello','nihao','nice'];
	
	        var str=arr.indexOf('nihao');
	
	        console.log(str); //3
	   
	    
	  
	        //从末尾遍历元素在数组中的位置，如果没有找到则返回-1
	        var arr=['hao','hi','hello','nihao','nice'];
	
	        var str=arr.lastIndexOf('nihao');
	
	        console.log(str); //3
	        
	  


	8. 作业：统计一个数组（或者字符串）中每个元素出现的次数？？？？

	9. forEach()

			array8.forEach(function (item,index) {
    			console.log(item+':'+index);

			});
	10. every()

		检测数组的每一项是否符合某种规则，全符合返回true，否则返回false
		
			var array8=[11,23,31,41,53,61];
			
			// var res=array8.every(function (item,index) {
			判断每个元素是否都大于30
			//     // return item>30;
			//判断每个元素是否都是偶数
			//     return item%2==0;
			// });
			//
			// console.log(res);
			
			
			function issushu(num) {
			    for(var i=2;i<=num/2;i++){
			        if(num%i==0){
			            break;
			        }
			    }
			
			    // if(i>num/2){
			    //     return true
			    // }else {
			    //     return false
			    // }
			
			    return i>num/2?true:false;
			}
			
			判断每个元素是否都是素数
			var res=array8.every(function (item) {
			    return issushu(item);
			});
			
			
			console.log(res);
	11. some()

		some() 检测数组的每一项是否符合某种规则，只要有一项或一项以上符合返回true，全不符合返回false
		
				var res=array8.some(function (item) {
				    return issushu(item);
				});
	12. filter()

		filter() 返回符合某种条件的数组元素组成的新数组
		
			var arr9=[1,3,6,8,10,3,4,9];

			var f=arr9.filter(function (item,index,array) {
			    return  item>=6 && item % 2==0;
			});
			console.log(f);// [ 6, 8, 10]
	13. map()
		
		map() 对数组的每一项运行给定函数，返回每次函数结果组成的数组
		
			var arr10=[1,3,6,8,10,3,4,9];
			var narr=arr10.map(function (item,index,array) {
			    return item*2;
			})
			console.log(narr);
	14. isArray()
	15. reduce()

			var num = [1,2,3,4,5];

			//total是最终的和,num是每次取出的数组元素
			
			var res = num.reduce(function(total,num){
			    // console.log(num)
			    return total+num;
			    //return total + Math.round(num);//对数组元素四舍五入并计算总和
			},0);  //0是res的初始值
			console.log(res);
			
		**合并两个数组**
			
			var red = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
			    return a.concat(b);
			}, []);
			console.log(red)
2. Json(JavaScript Object Notation) 

	 1. 是一种轻量级的数据交换格式。它基于ECMAScript的一个子集。 

			 var persons={
				    "users":[
				        {"name":"tom","age":12},
				        {"name":"jack","age":13},
				        {"name":"rose","age":14}
				    ],
				    "boss":{"name":"boss","age":32}
			};
	2. json和字符串相互转化

			var user2={"name":"tom","age":12};

			//1. json---->string
			
			var str_user2=JSON.stringify(user2);
			
			console.log(typeof str_user2);
			console.log(str_user2.name);
			
			//2. string------>json
			var json_user2=JSON.parse(str_user2);
			
			console.log(typeof json_user2);
			
			console.log(json_user2.name);
	
	3. 遍历json

			var user2={"name":"tom","age":12};
			// for(var key in user2){
			//     console.log(key,user2[key]);
			// }
			
			// var users=[
			//     {"name":"tom","age":12},
			//     {"name":"jack","age":13},
			//     {"name":"rose","age":14}
			// ];
			//
			// for(var user of users){
			//     for(var key in user){
			//         console.log(key,user[key]);
			//     }
			// }
	4. json本身也是以数组的形式存储

			var arr2=[10,20,30];

			arr2["other"]=40;
			
			console.log(arr2);
			
			for(var key in arr2){
			    console.log(key);
			}
	5. 	json补充

			var arr2=[10,20,30];

			arr2["other"]=40;
			arr2["other"]=50;
			
			var key1='hello';
			var key2='hello';
			
			// var key1={};
			// var key2={};
			
			//key值只能是字符串
			arr2[key1]=80;
			arr2[key2]=180;
			
			console.log(arr2);
			
			
			for(var key in arr2){
			    console.log(key);
			}
			
			console.log(String(arr2));  //10,20,30
			
			console.log(arr2.valueOf()); //[ 10, 20, 30, other: 50, hello: 180 ]

3. Math(类方法)

	Math.floor() Math.abs() Math.ceil() Math.round() Math.random()
	Math.sqrt() Math.PI Math.pow()

4. String

	1. charAt()
	2. indexOf()
	3. substr(start,length)
	4. slice(start,end)
	5. toUpperCase()/toLowerCase()
	6. split()
	7. trim()
	8. match()
	9. replace()

	10. 在 JavaScript 中，虽然我们也可以显式的创建一个字符串对象，但是实际中我们用的更多的还是字符串直接量，在需要的时候 JavaScript 会有自动的类型提升。

			var s1='hello';
			var s2=new String('hello');
			
			console.log(s1==s2);
			console.log(s1===s2);
			
			console.log(typeof s1);
			console.log(typeof s2);
			
			console.log(s1.length);
			
			//相当于
			
			console.log(new String(s1).length);
			
5. 正则表达式

	正则表达式英文为 regular expression，意思是符合某种规则的表达式，常常用于像上面那种情况下的模糊查询。
	
		// var reg01=/^\d{3,6}$/;
		//
		// var s='a1234';
		//
		// var res01=reg01.test(s);
		
		// console.log(res01);
		
		
		// var reg02=/^[a-z]{3,6}$/i;
		//
		// var s2='Hello';
		// var s3='nihao';
		//
		// var cp_reg02=reg02.compile();
		//
		// var res02=cp_reg02.test(s2);
		// var res03=cp_reg02.test(s3);
		
		// console.log(res02);
		
		
		var reg03=/abc/gi;
		
		var s3='Hello,Abc,nihao,abc';
		
		
		// var cp_reg03=reg03.compile();
		//
		// var res03=reg03.exec(s3);
		
		var res03=s3.match(reg03);
		
		
		console.log(res03);
		
		
		var s4='2018-12-1 12:30:30';
		
		var res04=s4.split(/[- :]/);
		
		console.log(res04);
		
		
		// var res05=s4.replace(/12/,'24');
		var res05=s4.replace(/12/g,'24');
		
		console.log(res05);



4. 日期

		var str_date='2018-12-28 08:00:00';

		//将字符串转化为日期对象
		var mydate3=new Date(str_date);
		//获取系统当前时间
		var mydate4=new Date();
		// var mydate3=new Date();
		
		console.log(mydate3);
		console.log(mydate3.getDate());
		console.log(mydate3.getYear());         //118
		console.log(mydate3.getFullYear());     //2018
		console.log(mydate3.getMonth());        //月份是从0开始
		console.log(mydate3.getDay());        //月份是从0开始
		
		console.log(mydate4-mydate3);   //得到两个时间相差的毫秒数
		
		// 把日期对象转化为时间戳
		
		var time_num=mydate3.getTime();
		console.log(time_num); //获取累计毫秒数，从1970-1-1开始计算
		
		//把时间戳转化为日期
		
		var time=new Date(time_num);
		console.log(time);
		
		// var mydate5=new Date(mydate4.toLocaleString());
		//
		// console.log(mydate5);
		
		
		// 时间字符串-时间对象-时间戳
		
		
		//输出年月日
		
		console.log(mydate3.toLocaleDateString());
		console.log(mydate3.getMonth()+1+"-"+mydate3.getDate());
		
		//完整时间
		
		console.log(mydate3.toLocaleString());
		console.log(mydate3.toUTCString());
