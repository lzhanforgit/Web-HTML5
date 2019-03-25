### Vue.js

## vue-cli脚手架

1. 简介

    vue-cli是一个vue脚手架，可以快速构造项目结构
    
    vue-cli本身集成了多种项目模板：
    
        simple  很少简单
        webpack 包含ESLint代码规范检查和unit单元测试等
        webpack-simple 没有代码规范检查和单元测试
        browserify 使用的也比较多
        browserify-simple

2. 示例，步骤：

	2.1 安装vue-cli，配置vue命令环境
	
	    cnpm install vue-cli -g
	    vue --version
	    vue list
	   
	 >如果没有cnpm命令可以按照：
	 
	 >npm install -g cnpm --registry=https://registry.npm.taobao.org

	2.2 初始化项目，生成项目模板
	
    语法：vue init 模板名  项目名
    
    	vue init webpack myvue

	2.3 进入生成的项目目录，安装依赖模块包
    
    	cd vue-cli-demo
    	cnpm install

	2.4 运行
    
    	npm run dev  //启动测试服务
    	npm run build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上

3. 使用webpack模板

    vue init webpack vue-cli-demo2

    ESLint是用来统一代码规范和风格的工具，如缩进、空格、符号等，要求比较严格
[官网](http://eslint.org)

    问题Bug：如果版本升级到node 8.0 和 npm 5.0，控制台会报错：
        GET http://localhost:8080/__webpack_hmr net::ERR_INCOMPLETE_CHUNKED_ENCODING
    解决方法：
        a)降低Node版本到7.9或以下
        b)修改build/dev-server.js文件，如下：
            var hotMiddleware = require('webpack-hot-middleware')(compiler, {
              log: () => {},
              heartbeat:2000 //添加此行
            })
        参考：https://github.com/vuejs-templates/webpack/issues/731

4. 目录结构分析

	index.html：应用的起始页，注意里面#app
	
	main.js	：程序的入口文件
	
	App.vue	：容器组件
	
	asset		:项目图标等
	
	static		:项目静态文件
	
5. 组件

	1. 全局组件

		在main.js
		
			import NavMain from './components/NavMain'
			
			Vue.component('nav-main', NavMain);
	2. 组件调用局部组件

			<script>
  				import axios from 'axios';
  				impert NavComponent from './NavComponent'
  				
  				
  				export default{
  					...
  					components:{'nav-com': NavComponent}
  				
  				}
  				
  			</script>
	

## vue-router 
---
1. vue-router页面标签

	页面布局

	router-link
	
	router-view

		<div>
		<router-link to="/home">主页</router-link>
		<router-link to="/user">用户</router-link>
		</div>
		
		....
		<div>
		  <router-view></router-view>
		</div>

2. 路由文件范例

		import Vue from 'vue'
		import Router from 'vue-router'
		import HelloWorld from '@/components/HelloWorld'
		import Index from '@/components/Index'
		import SearchMain from '@/components/SearchMain'
		import JobDetail from '@/components/JobDetail'
		
		Vue.use(Router)
		
		export default new Router({
		  routes: [
		    {
		      path: '/',
		      name: 'index',
		      component: Index
		    },
		    {
                           // will match anything starting with `/user-`
                path: '/user-*'
                },
		    {
               // will match everything
               path: '*',
               name: 'notfound',
               component: Not404
             }
             
		    		  
		    		  
		    ]
		})

3. 路由传值

    1. 通过router-link传值

        * 路由表制定传值变量

                {
                      path: '/boke/:userId',
                      name: 'boke',
                      component: Boke
                    }

        * router-link
        
                <router-link :to="{ name: 'boke', params: { userId: 123 }}">Boke</router-link>


        * 目标页面接受

            在方法中

            this.$route.parmas

            在模板中

            {{$route.params.userId}}

    2. 通过router-link地址栏传值

         * 路由表制定传值变量

                     {
                           path: '/boke/:userId',
                           name: 'boke',
                           component: Boke
                         }
         * router-link

                <li><router-link :to="{ path: 'boke', query: { plan: 'oh oh' }}">Boke22</router-link></li>
         * 目标页面接受

                     在方法中

                     this.$route.query

                     在模板中

                     {{$route.query.plan}}
    3. 程序化导航

        当您单击a时<router-link>，这是内部调用的方法，因此单击<router-link :to="...">等同于调用router.push(...)。

            this.$router.push({ name: 'boke', params: { userId: '666' } })
            
            this.$router.go(-1);
            this.$router.go(1);
             this.$router.go(100);


        **注意**

            this.$router.push({ path: 'register', query: { plan: 'private' } })
        这种方式是通过地址栏传递参数，所以路由中就不需要使用/:plan,并且通过

            this.$router.query

    4.  对Params更改做出反应
    
        使用带有params的路由时要注意的一点是，当用户导航/user/foo到时/user/bar，将重用相同的组件实例。由于两个路由都呈现相同的组件，因此这比销毁旧实例然后创建新实例更有效。但是，这也意味着不会调用组件的生命周期钩子。
        
        要对同一组件中的params更改做出反应，您只需查看$route对象即可：
        
            const User = {
              template: '...',
              watch: {
                '$route' (to, from) {
                  // react to route changes...
                }
              }
            }
            
4. 嵌套路由

    1. 在路由文件中添加子路由
    
            {
                                    path: '/user/',
                                    name: 'user',
                                    component: User,
                                    children: [
                                      {
                                        // UserProfile will be rendered inside User's <router-view>
                                        // when /user/:id/profile is matched
                                        path: 'profile',
                                        component: UserProfile
                                      },
                                      {
                                        // UserPosts will be rendered inside User's <router-view>
                                        // when /user/:id/posts is matched
                                        path: 'posts',
                                        component: UserPosts
                                      }
                                    ]
                                  },
    2. 在子组件中加入导航和组建容器
            
            <template>
                <div>
                  <h1>user</h1>
            
                  <ul>
                    <li><router-link to="/user/profile">profile</router-link></li>
                    <li><router-link to="/user/posts">posts</router-link></li>
                  </ul>
                  <div>
                    <router-view></router-view>
                  </div>
                </div>
            </template>                              