#DOM
##part 1-DOM1

NODE

1. NODE
    
    1. node类型(12种)


        ```
            console.log(ele.nodeType)；
                    //1-element
                    //2-attribute
                    //3-text
        ```

    2. nodeName

        >如果节点类型为1，则该节点有tagName属性。

        ```
            var ele=document.getElementsByTagName('div')[0];
            console.log(ele.nodeName);//DIV
        ```
    3. nodeValue


    
2. 节点关系

    >每个节点都有一个childNodes属性，返回结果为nodeList类数组对象.将这个类数组对象转化为数组对象的代码：
    
    ```
        var arrayNodes=Array.prototype.slice.call(ele.childNodes,0);
        
    ```
    >为了适配IE8及以前的版本
    
    ```
        function convertToArray(obj) {
        var array=null;
        try {
            array=Array.prototype.slice.call(obj,0);
        }catch (e){
            array=new Array();
            for(var i=0;i<obj.length;i++){
                array.push(obj[i]);
            }
        }
            return array
        }

    ```
    ><b style='color:red;font-size:1.4em'>childNodes,每次换行都会产生一个文本节点</b>
    
    ~~~
        <div id="div01">
                <!--<p>我是段落标签</p>-->
                <!--<h1>一级标题</h1>-->
                <!--<b>加粗标签</b>-->
                <!--<b>加粗标签</b>-->
        </div>
        <script>
                window.onload=function () {
                    var div01=document.getElementById('div01');
                    var nlistlen=div01.childNodes.length;
                    console.log(nlistlen); //1
                    var nodeName=div01.childNodes[0].nodeName;
                    //#text
                }
        </script>
    ~~~
3. parentNode
    
    ~~~
                var p=document.getElementsByTagName('p')[0];
                var parent=p.parentNode.nodeName;
                console.log(parent);//DIV
        
                var h1=document.getElementsByTagName('h1')[0];
                var parent_h1=h1.parentNode.nodeName;
                console.log(parent_h1);//DIV
    ~~~
    
4. previousSibling,nextSibling
    ~~~
         var pre_node=h1.previousSibling;
         var next_node=h1.nextSibling;
         //var pre_node=h1.previousElementSibling;
         //<p>我是段落标签</p>
         
         //var next_node=h1.nextElementSibling;
         //<b>加粗标签</b>
         
         console.log(pre_node);//#text
         console.log(next_node);//#text
         
         <ul>
                 <li>laaa</li>
                 <li>lbbb</li>
                 <li>lccc</li>
                 <li>lddd</li>
         </ul>
         
         var ul=document.getElementsByTagName('ul')[0];
         var f=ul.firstChild.nextSibling.firstChild;
         console.log(f);//laaa
    ~~~

5. appendChild()
    
        var ul=document.getElementsByTagName('ul')[0];
        var li=document.createElement('li');
        li.setAttribute('id','001');
        //新建文本节点
        var txt=document.createTextNode('-haha-');
        li.appendChild(txt);
        var f=ul.appendChild(li);
        console.log(f);
 
6. insertBefore
        
        var li03=document.getElementById('li03');
        var f=ul.insertBefore(li,li03);
        
      >下面两条语句等价
      
        //ul.insertBefore(li,null);
        //ul.appendChild(li);
7. replaceChild
    
        var li03=document.getElementById('li03');
        var f=ul.replaceChild(li,li03);
        console.log(f);
8. removeChild(),remove()

        var li03=document.getElementById('li03');
        var f=ul.removeChild(li03);

        var ff=ul.remove();     //清空所有子元素,ff:undefined
        
9. cloneNode(boolen)

      >当参数为true表示深复制,内部节点都复制。false表示只复制当前的节点
    
        var uull=ul.cloneNode(true);
        document.body.appendChild(uull);

DOCUMENT

10. document
    >nodeType   :9

    >nodeName   :#document
    
    >nodeValue  :null
    
    >parentNode :null
    
    >所以浏览器都支持
    
        document.body;              //body 节点
        document.documentElement;    //html 节点
        
        document.title='hello js';  
        console.log("..."+document.URL);
        console.log("..."+document.domain);//域名
        
11. 查找元素(p:257)
    
    document.getElementById();

    >为了防止出错，元素的name和id属性值不要相同。

    document.getElementsByTagName()

         <div id="div01" name="div_01">111</div>
         <div name="div_02">222</div>
         <div name="div_03">333</div>
         <div name="div_04">444</div>

         var divs=document.getElementsByTagName('div');
         var con1=divs[0].firstChild;
         console.log(con1);     //"111"
         var con2=divs['div_01'].firstChild;
         console.log(con2);     //"111"

         //获取所有标签节点

         var nodes=document.getElementsByTagName('*');


12. 节点属性

    * setAttribute('attribute','value');

    * getAtrribute('attribute');

    * removeAttribute('attribute');

    >属性名不区分大小写

    >根据HTML5规范，自定义属性应该加上 data- 作为前缀。如下

        <div id="div05" data-user-name="lzhan"></div>
        var div=document.getElementById('div05');

        //访问采用驼峰法

        var v=div.dataset.userName;
        console.log(v);

13. DocumentFragment

    >使用DocumentFragment将一批子元素添加到任何类似node的父节点上，对这批子元素的操作
    不需要一个真正的根节点。程序员可以不依赖可见的DOM来构造一个DOM结构，而效率高是它真正的优势，
    试验表明，它比直接操作DOM快70%。下面我们就来看看DocumentFragments是如何使用的！

    案例：

        <ul id="list"></ul>

    >DOM插入和修改是一个很费力耗时的工作，所以，这样的交互越少越好。这就是DocumentFragment
    发挥功用的地方了。第一步我们先创建一个DocumentFragment：

        var frag = document.createDocumentFragment();
        for(var x = 0; x < 10; x++) {
        	var li = document.createElement("li");
        	li.innerHTML = "List item " + x;
        	frag.appendChild(li);
        }
        listNode.appendChild(frag);

    >使用DocumentFragement要比直接对DOM节点操作要快的多，而且程序员可以利用新DOM节
    点来操作DocumentFragement，这样比操作整个页面DOM要更容易。所以，当需要进行大量DOM
    操作时，尽量使用DocumentFragement，它会让你的应用变的更快！

14. 动态脚本

    动态脚本，指文档加载时脚本不存在，当需要时动态加入。计入主要有两种方式
    动态引入和动态插入JS代码

    比如：

        <script type="text/javascript" src="js/main.js"></script>
            //相当于
        var script=document.createElement('script');
        script.type='text/javascript';
        script.src='js/main.js';
        document.body.appendChild(script);

    如果采用动态插入JS代码

        script.text="function show(){alert('hello');}"

        //为了兼容所有浏览器可以这样

        var code="function show(){alert('hello');}";
        try{
            script.appendChild(document.createTextNode(code));
        }catch(e){
            script.text=code;
        }
        document.body.appendChild(script);

15. 动态样式

        var link=document.createElement('link');
        link.rel='stylesheet';
        link.type="text/css";
        link.href="css/main.css";
        var head=document.getElementsByTagName('head')[0];
        head.appendChild(link);

     改进：

        function loadCss(cssfile){

            var link=document.createElement('link');
            link.rel='stylesheet';
            link.type="text/css";
            link.href=cssfile;
            var head=document.getElementsByTagName('head')[0];
            head.appendChild(link);
        }

     动态插入CSS代码

        function loadCssCode(csscode){
            var link=document.createElement('link');
            link.rel='stylesheet';
            link.type="text/css";
            try{
                style.appendChild(document.createTextNode(csscode));
            }catch(e){
                style.styleSheet.cssText=csscode;
            };
            var head=document.getElementsByTagName('head')[0];
            head.appendChild(link);
        }

DOM扩展
=====
