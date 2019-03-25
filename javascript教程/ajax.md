### 什么是AJAX

ajax 即“Asynchronous JavaScript and XML”（异步 JavaScript 和 XML），
也就是无刷新数据读取。

### http 请求

首先需要了解 http 请求的方法（GET 和 POST）。

GET 用于获取数据。GET 是在 URL 中传递数据，它的安全性低，容量低。

POST 用于上传数据。POST 安全性一般，容量几乎无限。

### ajax 请求
#### ajax 请求一般分成 4 个步骤。

1. 创建 ajax 对象

  在创建对象时，有兼容问题：

  ```
  var oAjax = new XMLHttpRequest();   //for ie6 以上
  var oAjax = new ActiveXObject('Microsoft.XMLHTTP'); //for ie6

  //合并

  var oAjax = null;
  if(window.XMLHttpRequest){
      oAjax = new XMLHttpRequest();
  }else{
      oAjax = new ActiveXObject('Microsoft.XMLHTTP');
  }
  ```

2. 连接服务器

  在这里会用到 open() 方法。启动一个请求以备发送。open() 方法有三个参数，

  * 第一个参数是连接方法即 GET 和 POST，
  * 第二个参数是 URL 即所要读取数据的地址，
  * 第三个参数是否异步，它是个布尔值，true 为异步，false 为同步。

  ```
  oAjax.open('GET', url, true);
  ```

  >在open()之后、send()之前可以修改HTTP请求头信息，建议不要改变浏览器默认设置的信息，可以增加
  自定义的数据
  ```
    oAjax.setRequestHeader('myId','001');

    //查看responseHeader
    oAjax.getResponseHeader('content-type');
    oAjax.getAllResponseHeaders()
  ```
3. 发送请求

   send() 方法。

   ```
   oAjax.send(null);
   //如果不需要传送数据，则必须放置null。因为部分浏览器要求必须要加null。
   ```

   如果您希望通过 GET 方法发送信息，请向 URL 添加信息
   但是url加的查询字符串必须使用 encodeURICompent()进行编码才能加入。

   ```
               function addURLParam(url,name,value) {
                   url+=(url.indexOf("?")==-1)?"?":"&";
                   url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
                   return url;
               }
   ```

   将请求发送到服务器。
   string：仅用于 POST 请求

   ```
   oAjax.send('fname=Bill&lname=Gates);
   ```

   如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。
   然后在 send() 方法中规定您希望发送的数据(表单数据封装格式和GET提交数据格式相同)：
   ```
   oAjax.send($('#myform').serialize());
   ```

   ```
   xmlhttp.open("POST","ajax_test.asp",true);
   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
   xmlhttp.send("fname=Bill&lname=Gates");
   ```
   > send()请求是同步的，意味着后续的js代码必须等到服务器响应之后才继续执行。所以在收到响应后，
   响应的数据会自动填充到XHR对象的属性。


4. 接收返回值

    XHR对象接受的属性有：
    * responseText
    * responseXML 如果响应的内容类型是"text/xml"或"application/xml"，则该属性值为XML DOM文档。
    * status
    * statusText


   onreadystatechange 事件。当请求被发送到服务器时，我们需要执行一些基于响应的任务。
   每当 readyState 改变时，就会触发 onreadystatechange 事件。

   readyState：请求状态，返回的是整数（0-4）。

   0（未初始化）：还没有调用 open() 方法。

   1（载入）：已调用 send() 方法，正在发送请求。

   2（载入完成）：send() 方法完成，已收到全部响应内容。

   3（解析）：正在解析响应内容。

   4（完成）：响应内容解析完成，可以在客户端调用。

   status：请求结果，返回 200 或者 404。

   200 => 成功。

   304 => 请求的资源并没有被修改，可以直接使用浏览器中缓存的版本。

   404 => 失败。

   responseText：返回内容，即我们所需要读取的数据。需要注意的是：responseText 返回的是字符串。

    ```
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                fnSucc(oAjax.responseText);
            }else{
                if(fnFaild){
                    fnFaild();
                }
            }
        }
    };
    ```


### XMLHttpRequest 2

1. formdata

    ```
    var form=$('#myform')[0];
    var formdata=new FormData(form);
    formdata.append('from','lzhan.com');
    formdata.set('from','163.com');

    console.log(formdata.get('from'));
    console.log(formdata.get('id'));
    formdata.forEach(function (value,key) {
        console.log(value);
    })
    ```
2. 超时设定

    ```
    oAjax.timeout=3000;
        oAjax.ontimeout=function () {

    };
    ```

3. 下载进度事件

    ```
    var pro=document.querySelector('#loadProgress');
                    oAjax.onprogress=function (e) {
                        pro.setAttribute('max',parseInt(e.totalSize));

                        if(e.lengthComputable){
                            pro.setAttribute('value',e.position);

                        }
                    }
    ```
    >progess事件会在接受数据期间周期性触发。