### Vue.js 
1. vue项目导入jquery

	1. 安装jq

			npm install jquery --save-dev
		
	2. 配置

		在build/webpack.base.conf.js中添加如下内容
		
			var webpack = require('webpack')
			...
			
			node:{...},
			// 增加一个plugins
			plugins: [
			  new webpack.ProvidePlugin({
			    $: "jquery",
			    jQuery: "jquery"
			  })
			],
	3. 在main.js中导入

			在main.js中添加内容
 			import $ from 'jquery'
	4. 测试

		在vue组件中加入以下代码
		
			<script>
			  /* eslint-disable */
			  jQuery(function () {
			    alert(123);
			  });
			export default {
			  name: 'HelloWorld',
			  data () {
			    return {
			      msg: 'Welcome to Your Vue.js App!!!'
			    }
			  }
			}
			</script>
			
	**注意**
	
	在加入以上代码后，会导致eslint格式验证错误，我们可以直接关闭这个测试，方法，在webpack.base.conf.js文件中注释掉：
		
		// ...(config.dev.useEslint ? [createLintingRule()] : []),
2. 导入bootstrap
	
	1. 安装bootstrap，
	
		npm install bootstrap --save-dev
	
   2. 在main.js导入
		
			import 'bootstrap/dist/css/bootstrap.min.css'
			
			import 'bootstrap/dist/js/bootstrap.min'
   		

























































