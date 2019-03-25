### Vue.js 组件
1. 定义组件的方式

	
    方式1：先创建组件构造器，然后由组件构造器创建组件
    
	    var cp = Vue.extend({template:'组件元素内容'})
	    Vue.component('组件名',cp)
    方式2：直接创建组件（推荐）
    
     	Vue.component('组件名',{template:'组件元素内容'})
     	
    因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
    
    ##demo:
    
    	<template id="wbs">
		    <div>
		        <h3>{{msg}}</h3>
		        <ul>
		            #注意这里的$event,表示事件对象
		            <li v-for="item in list" @click="display($event)">{{item.title}}</li>
		        </ul>
		    </div>
		</template>
		<!--行为层-->
		<script type="text/javascript">
		    //        #定义组件
		    Vue.component('job-item', {
		        props: ['list','msg'],
		        template: '#wbs',
		        //组件内部的函数
		        methods:{
		            display:function (t) {
		                alert(t.target.innerText)
		            }
		        }
		    })
		
		    var mydata = {
		        title: "vue.js",
		        jobs: [
		            {"id": "001", "title": "python", "salary": 8000},
		            {"id": "002", "title": "web", "salary": 9000},
		            {"id": "003", "title": "js", "salary": 10000},
		            {"id": "004", "title": "spider", "salary": 10000}
		        ],
		        works: [
		            {"id": "001", "title": "语文", "salary": 8000},
		            {"id": "002", "title": "书序", "salary": 9000},
		            {"id": "003", "title": "英语", "salary": 10000},
		            {"id": "004", "title": "化学", "salary": 10000}
		        ]
		    }
		    var app = new Vue({
		//            el:element
		        el: '#myapp',
		        data: mydata,
		        components: {
		            'my-tab': {
		                template: '<h2 v-text="content"></h2>',
		                data: function () {
		                    return {
		                        content: 0
		                    }
		                }
		            }
		        },
		        methods: {
		            changeData: function () {
		            }
		        }
		    })
		
		
		</script>
2. 组件的分类

    分类：全局组件、局部组件
    
	    components:{ //局部组件
	        'my-world':{
	          template:'<h3>{{age}}</h3>',
	          data:function (){
	            return {
	              age:25
	            }
	          }
	        }
	      }

3. 引用模板

    将组件元素内容放到模板\<template>中并引用其id
  
	  
		  <template id="wbs">
		    <div>
		      <h3>{{msg}}</h3>
		      <ul>
		        <li v-for="value in arr">{{value}}</li>
		      </ul>
		    </div>
		  </template>
		  components:{
		        'my-hello':{
		          template:'#wbs',
		        }
		  }
	 
	这个组件需要传递两个参数，调用方式为
	
		<my-hello :msg='var' :arr='array'></my-hello>
4. 动态组件

	<component :is="">组件
        多个组件使用同一个挂载点，然后动态的在它们之间切换
	
	<keep-alive>组件，使用缓存数据，适用于非活动组件
 
  	
  		 <keep-alive>
  			<component :is="flag"></component>//使该组件不每次请求，采用缓存数据
  		<keep-alive>

5. 父子组件


    在一个组件内部定义另一个组件，称为父子组件
    
    子组件只能在父组件内部使用
    
    默认情况下，子组件无法访问父组件中的数据，每个组件实例的作用域是独立的
	  
	  ```
	    var vm = new Vue({
	    el:'#d1',
	    data:{msg:'hello'},
	    components:{
	      'my-world':{
	        template:'#fatherComp',
	        components:{
	          'my-hello':{
	             template:'#sonComp'
	           }
	        },
	      }
	    }
	  })
	  <template id='fatherComp'><div><h1>父组件</h1><my-hello></my-hello></div></template>
	  <template id='sonComp'><div><h2>子组件</h2></div></template>
	  ```
6. 组件间数据传递 （通信）

	#### 6.1 子组件访问父组件的数据
	
	   a) 在调用子组件时，绑定想要获取的父组件中的数据
	    
	   b) 在子组件内部，使用props选项声明获取的数据，即接收来自父组件的数据
	   
	   总结：父组件通过props向下传递数据给子组件
	    
	   注：props除了字符串数组之外，也可以采用对象类型，允许配置高级设置，如类型判断、数据校验、设置默认值
	  
	  
		  props:{
		                message:String,
		                name:{
		                  type:String,
		                  required:true
		                },
		                age:{
		                  type:Number,
		                  default:18,
		                  validator:function(value){
		                    return value>=0;
		                  }
		                },
		                user:{
		                  type:Object,
		                  default:function(){ //对象或数组的默认值必须使用函数的形式来返回
		                    return {id:3306,username:'秋香'};
		                  }
		                }
		              },
	 
	
	#### 6.2 父组件访问子组件的数据
	    
	   a) 在子组件中使用vm.$emit(事件名,数据)触发一个自定义事件，事件名自定义
	
	
	    //子组件内部定义发送方法
	    methods:{
	                   send(){
	                      this.$emit('e-hello',this.sname,this.sage)
	                   }
	                 }
	
	   b) 父组件在使用子组件的地方监听子组件触发的事件，并在父组件中定义方法，用来获取数据
	
	    <template id='fatherComp'>
	      <div>
	        <h1>父组件数据{{fname}},获取子组件数据{{fsname}}-{{fsage}}</h1>
	        <my-hello :name=fname :age=fage @e-hello="getdata"></my-hello>
	      </div>
	    </template>
	
	    总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件
	
	#### 6.3 单向数据流
	    props是单向绑定的，当父组件的属性变化时，将传导给子组件，但是不会反过来
	    而且不允许子组件直接修改父组件中的数据，会报错
	    解决方式：
	        方式1：如果子组件想把它作为局部数据来使用，可以将数据存入另一个变量中再操作，不影响父组件中的数据
	        方式2：如果子组件想修改数据并且同步更新到父组件，两个方法：
	            a.使用.sync（1.0版本中支持，2.0版本中不支持，2.3版本又开始支持）
	                需要显式地触发一个更新事件
	            b.可以将父组件中的数据包装成对象，然后在子组件中修改对象的属性(因为对象是引用类型，指向同一个内存空间)，推荐
	
	### 7. 非父子组件间的通信
	    非父子组件间的通信，可以通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件
	
	    var Event=new Vue();
	    //发送数据组件
	    var A={
	      template:'#a',
	      data(){
	        return {
	          name:'tom'
	        }
	      },
	      methods:{
	        send(){
	          Event.$emit('data-a',this.name);
	        }
	      }
	    }
	    //接收数据组件
	    var C={
	      template:'#c',
	      data(){
	        return {
	          name:'',
	          age:''
	        }
	      },
	      mounted(){ //在模板编译完成后执行
	        Event.$on('data-a',name => {
	          this.name=name;
	          // console.log(this);
	        });
	
	        Event.$on('data-b',age => {
	          this.age=age;
	        });
	      }
	    }



























































