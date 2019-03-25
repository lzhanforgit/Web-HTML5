# JS性能优化技巧
1. 脚本应该放在页面元素代码之后

    >无论当前 JavaScript 代码是内嵌还是在外链文件中，页面的下载和渲染都必须停下来等待脚本执行完成。JavaScript 执行过程耗时越久，浏览器等待响应用户输入的时间就越长。浏览器在下载和执行脚本时出现阻塞的原因在于，脚本可能会改变页面或JavaScript的命名空间，它们会对后面页面内容造成影响。

2. 避免全局查找

    ```
        function search() {
            //当我要使用当前页面地址和主机域名
            alert(window.location.href + window.location.host);
        }
        //最好的方式是如下这样  先用一个简单变量保存起来
        function search() {
            var location = window.location;
            alert(location.href + location.host);
        }
    ```
3. 类型转换

    ```
    般最好用”" + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：
(“” +) > String() > .toString() > new String()
    ```
    
    ```
        var myVar = "3.14159",
        str = "" + myVar, //  to string  
        num=+myVar,       // to number
        i_int = ~ ~myVar,  //  to integer  
        f_float = 1 * myVar,  //  to float  
        b_bool = !!myVar,  /*  to boolean - any string with length 
                                and any number except 0 are true */
        array = [myVar];  //  to array
    ```
4. 多个类型声明

    在JavaScript中所有变量都可以使用单个var语句来声明，这样就是组合在一起的语句，以减少整个脚本的执行时间，就如上面代码一样，上面代码格式也挺规范，让人一看就明了。

4. 通过模板元素clone，替代createElement

    很多人喜欢在JavaScript中使用document.write来给页面生成内容。事实上这样的效率较低，如果需要直接插入HTML，可以找一个容器元素，比如指定一个div或者span，并设置他们的innerHTML来将自己的HTML代码插入到页面中。通常我们可能会使用字符串直接写HTML来创建节点，其实这样做，1：无法保证代码的有效性，2：字符串操作效率低，所以应该是用document.createElement()方法，而如果文档中存在现成的样板节点，应该是用cloneNode()方法，因为使用createElement()方法之后，你需要设置多次元素的属性，使用cloneNode()则可以减少属性的设置次数——同样如果需要创建很多元素，应该先准备一个样板节点。
    
    ```
        var frag = document.createDocumentFragment();
        for (var i = 0; i < 1000; i++) {
            var el = document.createElement('p');
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
        //替换为：
        var frag = document.createDocumentFragment();
        var pEl = document.getElementsByTagName('p')[0];
        for (var i = 0; i < 1000; i++) {
            var el = pEl.cloneNode(false);
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
    ```

5. 小心使用闭包

    闭包的案例

    ```
    document.getElementById('foo').onclick = function(ev) { };
    ```
    
6. 在循环时将控制条件和控制变量合并起来

    ```
    for ( var x = 0; x < 10; x++ ) {};
    ```
    
    当我们要添加什么东西到这个循环之前，我们发现有几个操作在每次迭代都会出现。JavaScript引擎需要：
    1：检查 x 是否存在
    2：检查 x 是否小于 10 
    3：使 x 增加 1
    
    改进
    
    ```
    var x = 9;
    do { } while( x-- );
    ```
7. 避免与null进行比较

    由于JavaScript是弱类型的，所以它不会做任何的自动类型检查，所以如果看到与null进行比较的代码，尝试使用以下技术替换：

    1、如果值应为一个引用类型，使用instanceof操作符检查其构造函数
    2、如果值应为一个基本类型，作用typeof检查其类型
    3、如果是希望对象包含某个特定的方法名，则使用typeof操作符确保指定名字的方法存在于对象上

8. 尊重对象的所有权

    因为JavaScript可以在任何时候修改任意对象，这样就可以以不可预计的方式覆写默认的行为，所以如果你不负责维护某个对象，它的对象或者它的方法，那么你就不要对它进行修改，具体一点就是说：

    1、不要为实例或原型添加属性
    2、不要为实例或者原型添加方法
    3、不要重定义已经存在的方法
    4、不要重复定义其它团队成员已经实现的方法，永远不要修改不是由你所有的对象，你可以通过以下方式为对象创建新的功能:
    1、创建包含所需功能的新对象，并用它与相关对象进行交互
    2、创建自定义类型，继承需要进行修改的类型，然后可以为自定义类型添加额外功能
    
9. 使用直接量

    ```
        var aTest = new Array(); //替换为
        var aTest = [];
        var aTest = new Object; //替换为
        var aTest = {};
        var reg = new RegExp(); //替换为
        var reg = /../;
        //如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
        var oFruit = new O;
        oFruit.color = "red";
        oFruit.name = "apple";
        //前面的代码可用对象字面量来改写成这样：
        var oFruit = { color: "red", name: "apple" };
    ```

10. 缩短否定检测

    ```
        if (oTest != '#ff0000') {
            //do something
        }
        if (oTest != null) {
            //do something
        }
        if (oTest != false) {
            //do something
        }
        //虽然这些都正确，但用逻辑非操作符来操作也有同样的效果：
        if (!oTest) {
            //do something
        }

    ```
    
11. 释放javascript对象

    随着实例化对象数量的增加，内存消耗会越来越大。所以应当及时释放对对象的引用，让GC能够回收这些内存控件。
对象：obj = null
对象属性：delete obj.myproperty
数组item：使用数组的splice方法释放数组中不用的item

12. 巧用||和&&布尔运算符

    ```
        function eventHandler(e) {
            if (!e) e = window.event;
        }
        //可以替换为：
        function eventHandler(e) {
            e = e || window.event;
        }
        
        
        
        if (myobj) {
            doSomething(myobj);
        }
        //可以替换为：
        myobj && doSomething(myobj);
    ```
13. switch语句相对if较快
14. 每条语句末尾须加分号



