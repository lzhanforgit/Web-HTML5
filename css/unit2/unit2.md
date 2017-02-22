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