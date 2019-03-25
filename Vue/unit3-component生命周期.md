### Vue.js 组件生命周期
1. 生命周期钩子函数

	beforeCreate	created
	
	beforeMount	mounted
	
	beforeUpdate	updated
	
	beforeDestory		destoryed
	
	示例代码：
	
		var vm = new Vue({
		    el: '#app',
		    data: {
		      message: 'Vue的生命周期'
		    },
		    beforeCreate: function() {
		      console.group('------beforeCreate创建前状态------');
		      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
		      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
		      console.log("%c%s", "color:red","message: " + this.message) 
		    },
		    created: function() {
		      console.group('------created创建完毕状态------');
		      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
		      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
		      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
		    },
		    beforeMount: function() {
		      console.group('------beforeMount挂载前状态------');
		      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
		      console.log(this.$el);
		      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
		      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
		    },
		    mounted: function() {
		      console.group('------mounted 挂载结束状态------');
		      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
		      console.log(this.$el);    
		      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
		      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
		    },
		    beforeUpdate: function () {
		      console.group('beforeUpdate 更新前状态===============》');
		      console.log("%c%s", "color:red","el     : " + this.$el);
		      console.log(this.$el);   
		      console.log("%c%s", "color:red","data   : " + this.$data); 
		      console.log("%c%s", "color:red","message: " + this.message); 
		    },
		    updated: function () {
		      console.group('updated 更新完成状态===============》');
		      console.log("%c%s", "color:red","el     : " + this.$el);
		      console.log(this.$el); 
		      console.log("%c%s", "color:red","data   : " + this.$data); 
		      console.log("%c%s", "color:red","message: " + this.message); 
		    },
		    beforeDestroy: function () {
		      console.group('beforeDestroy 销毁前状态===============》');
		      console.log("%c%s", "color:red","el     : " + this.$el);
		      console.log(this.$el);    
		      console.log("%c%s", "color:red","data   : " + this.$data); 
		      console.log("%c%s", "color:red","message: " + this.message); 
		    },
		    destroyed: function () {
		      console.group('destroyed 销毁完成状态===============》');
		      console.log("%c%s", "color:red","el     : " + this.$el);
		      console.log(this.$el);  
		      console.log("%c%s", "color:red","data   : " + this.$data); 
		      console.log("%c%s", "color:red","message: " + this.message)
		    }
		  })
2. 在beforeCreate和created钩子函数之间的生命周期

	在这个生命周期之间，进行初始化事件，进行数据的观测，可以看到在created的时候数据已经和data属性进行绑定（但是此时还没有渲染页面，放在data中的属性当值发生改变的同时，视图也会改变）。
注意看下：此时还是没有el选项

3. created钩子函数和beforeMount间的生命周期

	在这一阶段发生的事情还是比较多的。

	**首先**、会判断对象是否有el选项。如果有的话就继续向下编译，如果没有el选项，则停止编译，也就意味着停止了生命周期，直到在该vue实例上调用vm.$mount(el)。此时注释掉代码中:

		el: '#app',
	然后运行可以看到到created的时候就停止了：
	
	
	**然后**，我们往下看，template参数选项的有无对生命周期的影响。
	
	（1）.如果vue实例对象中有template参数选项，则将其作为模板编译成render函数。
	
	（2）.如果没有template选项，则将外部HTML作为模板编译。
	
	（3）.可以看到template中的模板优先级要高于outer HTML的优先级。
修改代码如下, 在HTML结构中增加了一串html，在vue对象中增加了template选项：
			
			<div id="app">
		    	<!--html中修改的-->
		    	<h1>{{message + '这是在outer HTML中的'}}</h1>
		  	</div>
			var vm = new Vue({
		    el: '#app',
		    template: "<h1>{{message +'这是在template中的'}}</h1>", //在vue配置项中修改的
		    data: {
		      message: 'Vue的生命周期'
		    }
	（4） 在vue对象中还有一个render函数，它是以createElement作为参数，然后做渲染操作，而且我们可以直接嵌入JSX.

		new Vue({
		    el: '#app',
		    render: function(createElement) {
		        return createElement('h1', 'this is createElement')
		    }
		})
		
		
	所以综合排名优先级：
	
	render函数选项 > template选项 > outer HTML.
	
4. beforeMount和mounted 钩子函数间的生命周期

	可以看到此时是给vue实例对象添加$el成员，并且替换掉挂在的DOM元素。因为在之前console中打印的结果可以看到beforeMount之前el上还是undefined。
5.  mounted

	在mounted之前h1中还是通过{{message}}进行占位的，因为此时还有挂在到页面上，还是JavaScript中的虚拟DOM形式存在的。在mounted之后可以看到h1中的内容发生了变化。
	
	**在mounted的时候调用属性和方法是最好的时机**
6. beforeUpdate钩子函数和updated钩子函数间的生命周期

	当vue发现data中的数据发生了改变，会触发对应组件的重新渲染，先后调用beforeUpdate和updated钩子函数。
	在beforeUpdate,可以监听到data的变化但是view层没有被重新渲染，view层的数据没有变化。等到updated的时候 view层才被重新渲染，数据更新。
	
7. beforeDestroy和destroyed钩子函数间的生命周期

	beforeDestroy钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。