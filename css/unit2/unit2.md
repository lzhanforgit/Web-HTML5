### box

1. 水平格式化

    块元素宽度='width'+'border-left'+margin-left'+'padding-left'+'border-right'+'margin-right'+'padding-right'

    块元素宽度=父块元素宽度

    其中 width只是其中的一个属性,可视宽度就是width。
    如果元素有背景，背景会延伸到内边距中（包括padding和border）,但是不会延伸到外边距。



2. 水平属性

    在7个水平属性中，width,margin-left,margin-right的值可以为auto.其他属性的
    必须有值或者默认为0.

    如果设置width,margin-left,margin-right其中两个属性的值为固定值，则余下的那个
    属性值为（父块级元素宽度-两个属性值之和）。而如果三个都为0，则width取最大值，其他两个
    属性为0。

    <h6 style='color:blue'>备注：</h6>

    margin:auto;设置元素左右外边距宽度相等，也就是让块元素居中。而text-align:center;
    只能让块元素内部的内联元素居中。

    <h6 style='color:blue'>
    水平外边距不会合并，也只有margin属性可以设为负值
    </h6>

    ```
    margin:top right bottom left
    ```
3. 垂直属性

    垂直属性和水平属性都包含7个属性

    <h6 style='color:blue'>不同：</h6>

    当margin-top,margin-bottom设置为auto时，会被自动取值为0，所以不可以垂直居中。

    <h6 style='color:blue'>注意：</h6>

    当margin-top,margin-bottom值为百分比时，其相对的值是父块级元素的<b style='color:blue'>width</b>.

4. background

    1. background-position

    该属性默认参考的坐标原点是容器的左上角，但是CSS3新增加了具体的方向设定

        ```
        background: url(code-pirate.svg) no-repeat #58a;
        background-position: right 20px bottom 10px;
        ```

    回退方案

        ```
        background: url(code-pirate.svg) no-repeat bottom right #58a;
        background-position: right 20px bottom 10px;
        ```

    2. background-origin

        >在网页开发生涯中，你很可能多次写过类似 background-position: top left; 这样的代码。你是否曾经有过疑惑:
         这个 top left 到底是哪 个左上角?你可能知道，每个元素身上都存在三个矩形框: border box(边框的外沿框)、
         padding box(内边距的外沿框)和 content box
         (内容区的外沿框)。那 background-position 这个属性指定的到底是哪个 矩形框的左上角?

        >默认情况下，background-position 是以 padding box 为准的，这样边 框才不会遮住背景图片。
         因此，top left 默认指的是 padding box 的左上 角。不过，在背景与边框(第三版)(http://w3.org/TR/css3-background)中，
         我们得到了一个新的属性 background-origin，可以用它来改变这种行为。
         在默认情况下，它的值是(闭着眼睛也猜得到)padding-box。如果把它的 值改成 content-box(参见下面的代码)，
         我们在 background-position 属 性中使用的边角关键字将会以内容区的边缘作为基准(也就是说，此时背景 图片距离边角的偏移量就跟内边距保持一致了):

         ```
         padding: 10px;
         background: url("code-pirate.svg") no-repeat #58a
         bottom right; /* 或 100% 100% */ background-origin: content-box;
         ```
    3. background-clip

        >background-clip：border|padding|content

         该属性指定了背景在哪些区域可以显示，但与背景开始绘制的位置无关，背景的绘制的位置可以出现在不显示背景的区域，这时就相当于背景图片被不显示背景的区域裁剪了一部分一样。

        >background-origin：padding|border|content

         该属性指定了背景从哪个区域(边框、补白或内容)开始绘制,但也仅仅能控制背景开始绘制的位置，你可以用这个属性在边框上绘制背景，但边框上的背景显不显示出来那就要由background-clip来决定了
4. background-attachment 让背景图像处于可视区的估计位置，不受滚动的影响。

    ```
        body{
            margin: 0;
            padding: 0;
            background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487328741651&di=d8208e5ecba924b32f0dee2541c0d837&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e60e56e7aa8f32f875520fa93b49.jpg");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100px;
            height: 600px;

            background-attachment: fixed;
        }
    ```

5. box-shadow 实现多重边框

    ```
        //下面代码实现投影
    box-shadow: 0 0 10px red;

        //下面代码实现边框，注意第四个参数
    box-shadow: 0 0 0px 40px red;

        //下面代码实现向内部投影
    box-shadow: 0 0 0px 40px red inset;

        //下面代码实现多重边框
    box-shadow: 0 0 0px 40px red，
                0 0 0px 30px green，
                0 0 0px 20px red;
    ```

6. border,outline,box-shadow效果

    ```
    <style>
            body{
                background-color: grey;

            }


            .div01{
                width: 200px;
                height: 100px;
                background: white;
                margin-left: 100px;
                margin-top: 200px;
                box-shadow: 0 0 0px 4px yellow;
                border-radius: 10px;
                /*border: solid 10px red;*/
                outline: solid 10px yellow;

            }

            .div01:hover{
                background-color: #00b3ee;
            }
    </style>
    <div class="div01"></div>
    ```
7. 背景渐变

    ```
        //渐变
        background: linear-gradient(#fb3, #58a);
        background: linear-gradient(#fb3 20%, #58a 50%);
        background: linear-gradient(#fb3 20%, #58a 50%,#ffff00 100%);
    ```


    ```
        //不会渐变，会有色块，因为开始（80%）大于结尾了（20%）
        background: linear-gradient(#fb3 80%, #58a 20%);

        //重复的色块，因为默认会平铺
        background: linear-gradient(#ffff00 50%, #682cff 50%);
        <!--background: linear-gradient(#ffff00 50%, #682cff 0);-->
        background-size: 100% 30px;

        //三种颜色块变换*******************中间两个色块要相同
        background: linear-gradient(#ffff00 20%, #682cff 0,#682cff 80%,red 0);

        //45度角变换

        background: repeating-linear-gradient(45deg,#ffff00 0, #ffff00 80px, #c065ff 0,#c065ff 160px);

        //垂直变换 (to right)表示方向

        background: linear-gradient(to right, #fb3 50%, #58a 0);
        background: linear-gradient(45deg, #fb3 50%, #58a 0);
        background-size: 30px 100%;

    ```
7. 椭圆效果

    ```
    // 椭圆

    border-radus:50%;

    //四个角度简写

    border-radius: 100px 90px 0px 0px;

    border-radius: 左上角 右上角 右下角 左下角;

    //下面代码相当于 100px 50px 100px 50px
    border-radius: 100px 50px;


    //上半圆

    width: 150px;
    height: 75px;
    background: red;
    border-radius: 75px 75px 0px 0px;

    //四分之一圆

     width: 75px;
     height: 75px;
     background: red;
     border-radius: 75px 0px 0px 0px;
     border-radius: 100% 0 0 0;

     //叶子形状
     width: 75px;
     height: 75px;
     background: red;
     border-radius: 75px 0px 0px 0px;


    ```

8. 菱形图片

    利用变形
    
    ```
    .picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden; }
    .picture > img { max-width: 100%;
    transform: rotate(-45deg) scale(1.42); }
    ```
    
    利用裁剪（四组坐标其实就是四个角的坐标）
    
    ```
    img {
           clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0 50%);
                transition: 1s clip-path;
            }
            img:hover {
                clip-path: polygon(0 0, 100% 0,100% 100%, 0 100%);
       }
    ```


