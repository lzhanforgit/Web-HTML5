### axios

1. 安装

        npm install --save axios

2. get

            axios.get('/user?ID=12345')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        // 也可以通过 params 对象传递参数
            axios.get('/user', {
            params: {
            ID: 12345
            }
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });

3. post

            axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });

    执行多个并发请求

        function getUserAccount() {
        return axios.get('/user/12345');
        }

        function getUserPermissions() {
        return axios.get('/user/12345/permissions');
        }

        axios.all([getUserAccount(), getUserPermissions()])
        .then(axios.spread(function (acct, perms) {
        //两个请求现已完成
        }));

## 全局组建

====

1. 定义组建

            <script>
               const url='http://127.0.0.1:8080';
                export default {
                    name: "Global",
                    url:url
                }
            </script>

2. 在main.js中注册

        import Global from './components/Global'
    
        Vue.prototype.Global=Global;

3. 在其他组建中使用

        {{Global.url}}
    
    
        function(){
            this.Global.url
    
        }
        
    **注意**
    
    使用全局变量，当变量改变时，不会主动更新组件。所以为了动态更新可以使用VUEX
    
4. 两个无关的组件传值-VUEX

    1. 安装
    
        npm install vuex --save
    
    2. 在SRC目录下新建"vuex/store.js"
    
            import Vue from 'vue'
            import Vuex from 'vuex'
            
            Vue.use(Vuex)
            
            const store = new Vuex.Store({
              // 定义状态
              state: {
                author: 'Wise Wrong',
                login_status:false
              }
            })
            
            export default store
    3. 然后在 main.js 中引入
       
       
           import Vue from 'vue'
           import App from './App'
           import Vuex from 'vuex'
           //引入store.js
           import store from './vuex/store'
           
           Vue.use(Vuex)
           
           /* eslint-disable no-new */
           new Vue({
             el: '#app',
             store,   //不要忘了这里
             render: h => h(App)
           })
    4. 在其他组件中使用
    
        在模板中
            
            {{$store.state.login_status}}
            
        在方法中
        
            this.$store.state.login_status
    
5. 两个无关的组件传值-通过事件

    1. 在根目录下新建一个js(bus.js)
    
            import Vue from 'vue'
            export default  new Vue()

    2. 如果组件B想传值给组件A，在组件A中注册一个事件
    
            import Bus from '../bus.js'
            
            mounted:function () {
            
                    
                    Bus.$on('myevent',(data)=>{
                      this.telephone=data
                    })
                    
                    
                  }
    
 	3. 在组件B中的方法内，触发事件
     
            Bus.$emit('myevent',response.data.telephone)          
