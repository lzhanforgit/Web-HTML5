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
        document.elementElement;    //html 节点
        
        document.title='hello js';  
        console.log("..."+document.URL);
        console.log("..."+document.domain);//域名
        
11. 查找元素
    
    document.getElementById();
    document.getElementsByTagName()