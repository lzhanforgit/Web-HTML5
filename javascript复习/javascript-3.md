DOM扩展
=====
对DOM的扩展主要分两个方面

    * 选择器扩展
    * HTML5扩展

>此外还有一些例如元素遍历规范和浏览器专有扩展

### 选择器API

1. querySelector()

    >该方法的参数为css选择符，返回与该方法匹配的**第一个**元素，如果
    没有找到则返回null.

        var div01=document.querySelector('#div01');
        console.log(div01.innerHTML);

    >如果通过节点元素调用该犯法，只会在该元素后代元素中找匹配的元素

         var div01=document.querySelector('#div01');
         var p_content=div01.querySelector('p').innerHTML;

2. querySelectorAll()

    >该方法用法同上，返回的是一个NodeList的实例

    >NodeList的实例并不会对文档进行搜索的动态查询，而是类似一组元素
    的快照。

        var div01=document.querySelector('#div01');
        var p_content=div01.querySelectorAll('p')[1].innerHTML;
        console.log(p_content);

### 元素遍历

 >对于元素间的空格，非IE浏览器都会返回文本节点，这就导致在使用childNodes
 和firstChild等属性时结果的不一致。为解决这一问题，遍历规范提供如下接口

    * childElementCount
    * firstElementChild
    * lastElementChild
    * priviousElementSibling
    * nextElementSibing

 遍历代码

    var i,len,child=element.firstElementChild;
    while(chile!=element.lastElementChild){
        processChild(child);
        child=child.nextElementChild;
    }

### HTML5扩展

3. getElementsByClassName()

    >接受一个参数，返回一个NodeList,传入参数时类名的先后顺序不重要。

        var nodelist1=document.getElementsByClassName("btn btn-lg");

        var nodelist2=document.getElementById('id').getElementsByClassName("btn btn-lg");

4. classList

        <div id="div01" name="div_01" class="btn btn-success btn-lg">

        var div01=document.querySelector('#div01');
        var classList=div01.classList;
        console.log(classList);
    >classList类型数组，有自己的length属性。同事他又是一个可以动态修改的变量

        var classList=div01.classList;

    * classList.add("btn-warning");
    * classList.remove("btn-warning");
    * classList.contains("btn-warning");
    * classList.toggle("btn-warning");


### 焦点管理

1. document.activeElement属性
    >返回焦点所处的元素

        <div id="div05" data-user-name="lzhan"></div>
        var input=document.getElementById('userName');
        input.focus();
        console.log(document.activeElement===input);//true
2. scrollIntoView(boolean)
    >boolean默认值为true

        var input=document.getElementById('userName');
        input.onclick=function () {
             document.getElementById('head').scrollIntoView(true);
        }