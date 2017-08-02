&copy;詹亮                     - site : https://github.com/lzhanforgit/H5Resources
# DOM 
### 1. 节点基础

1. 节点类型

    * 元素节点            　　     Node.ELEMENT_NODE(1)
    * 属性节点            　　     Node.ATTRIBUTE_NODE(2)
    * 文本节点            　　     Node.TEXT_NODE(3)

2. 节点属性

    * nodeType
    
        nodeType 属性返回以数字值返回指定节点的节点类型。

    * nodeName
    * nodeValue
    
    <table>
        <tr>
            <td></td>
            <td>nodeName</td>
            <td>nodeValue</td>
            <td>nodeType</td>
        </tr>
        <tr>
            <td>元素节点</td>
            <td>元素名</td>
            <td>null</td>
            <td>1</td>
        </tr>
        <tr>
            <td>属性节点</td>
            <td>属性名称</td>
            <td>属性值</td>
            <td>2</td>
        </tr>
        <tr>
            <td>文本节点</td>
            <td>#text</td>
            <td>节点的内容</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Document</td>
            <td>#document</td>
            <td>null</td>
            <td>9</td>
        </tr>
    </table>

### 2. 节点获取和修改属性 

1. 获取元素节点

    *     document.getElementById(elementId)
    *     document.getElementsByName(elementName)
    *     document.getElementsByTagName(tagName)
    *     document.getElementsByClassName(className)
           
    > getElementById(elementId),document.getElementsByName(elementName)是是document节点的专有方法；其他两个方法不是
                
    
    ```
    var ul=document.getElementsByTagName('ul')[0];
    //var li01=ul.getElementsByTagName('li');
    var li01=ul.getElementsByClassName('li-css');
    ```
    
    >后面三种方法返回的是NodeList,是一种伪数组（同样arguments也是伪数组）。

2. 节点系统属性的访问和修改

    * id
    * tagName
    * className
    * style

    code:
    
    ``` 
        <ul>
            <li id="li01" name="li" CLASS="licss" style="background-color: red">列       表一</li>
        </ul>
        
        <script>
            window.onload=function () {
                var li=document.getElementById('li01');
                
                //******* 属性访问 ********
                
                console.log(li.className);  //licss
                console.log(li.id);         //li01
                console.log(li.tagName);    //LI
                console.log(li.nodeName);    //LI
                console.log(li.style[0]);    //LI
                
                //******* 属性修改 ********
                
                li.className='licss2';
                li.style.backgroundColor='blue';
                
                //id 和 tagName 属性通常不可以修改。
            }
        </script>
    ```
3. 节点属性的访问和修改通用方法

    * dom.getAttribute('属性名')
    * dom.setAttribute(‘属性名’,'属性值')

    ```
    console.log(li.getAttribute('id'));
    li.setAttribute('class','licss02');
    ```
    ><b style='color:red'>注意</b>
    >不要给节点增加用户自定义属性，比如(belong),如果非要增加，则如第4点
    
    ```
    <li id="li01" belong='ul01' name="li" class="licss" style="background-color: red">列表一</li>

    ```
4. dataset 属性

    ```
    //必须以data开头，每个单词小写、并以“-”分割
     <li id="li01" data-user-id='s001'>列表一</li>
     
    //dom访问属性
    //dom.dataset.name(采用驼峰命名法)
    var li=document.getElementById('li01');
    console.log(li.dataset.userId);             //s001
    ```
    
### 3. 构建节点和添加、删除节点

1. createElement('标签名')
    
   ```
       var ul=document.getElementsByTagName('ul')[0];
       var li=document.createElement('li');
   ```
    
2. createTextNode('内容')

   ```
       var ul=document.getElementsByTagName('ul')[0];
       var li=document.createElement('li');
       var text=document.createTextNode('列表二');
       //text.nodeValue='haha';
   ```
   
3. createAttribute('属性名')
    
   ```
       var ul=document.getElementsByTagName('ul')[0];
       var li=document.createElement('li');
       var text=document.createTextNode('列表二');


       var atrr=document.createAttribute('class');
       atrr.nodeValue='li-css';
       li.attributes.setNamedItem(atrr);
       
       //等价于
       
       //li.setAttribute('class','li-css')

       li.appendChild(text);
       ul.appendChild(li);
   ```
   
4. innerHTML 和 innerText

   ```
       var ul=document.getElementsByTagName('ul')[0];
       
       ul.innerHTML+='<li>段落二</li>'
       
       //下面代码直接破坏列表的结构，通常innerText用于修改标签内文本节点的内容
       ul.innerText+='<li>段落二</li>'
   ```
   
   innerHTML和上面三种动态构建节点比较
   >innerHTML 操作方便，但是执行效率较低。
   >innerHTML 适合批量添加复杂的节点
   >动态构建节点 适合页面渲染完成之后增加节点

5. 克隆节点（复制现有的节点）
   
   dom.cloneNode(false/true)
   
   ```
    var ul=document.getElementsByTagName('ul')[0];
       var li01=document.getElementById('li01');
       var li02=li01.cloneNode(true);
       li02.id='li02';
       ul.appendChild(li02)
   ```
5. 添加节点 

   appendChild()

   ```
       ul.appendChild(li);
   ```
   insertBefore(newChild,refChild)
   
6. 删除和替换节点

   removeChild(dom)
   

   ```
       ul.removeChild(li01);
   ```
   
   replaceChild(new-dom,old-dom)
   
   ```
       ul.replaceChild(li02,li01)
   ```
   
   清空所有内部节点
   
   ```
       ul.innerHTML='';
   ```
   
### 4. 遍历节点

1. 子节点


    | 方法 | 说明 | 备注 |
    | --- | --- | --- |
    | childNodes | 所有直接子节点 | 伪数组 |
    | children | 所有直接元素子节点 | 伪数组 |
    | childElementCount | 所有直接元素子节点的个数 | children.length |
    | firstChild | 第一个子节点 | childNodes[0] |
    | firstElementChild | 第一个元素子节点 | children[0] |
    | lastChild | 最后一个子节点 | childNodes[childNodes.length-1] |
    | lastElementChild | 最后元素一个子节点 |  |


2. 父节点

    ```
        console.log(p01.parentNode.nodeName);
    ```
3. 兄弟节点    

    | 方法 | 说明 | 备注 |
    | --- | --- | --- |
    | previousSibling | 前面一个节点 |  |
    | previousElementSibling | 前面一个元素节点 |  |
    | nextSibling | 后面一个节点 ||
    | nextElementSibling | 后面一个元素节点 |  |
    
    ```
        console.log(p01.previousElementSibling.innerText);
    ```

   
...continue
   


              

