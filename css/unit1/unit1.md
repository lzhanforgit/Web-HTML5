
###css基础

1. html元素分类

    * 类型：替换元素和非替换元素
    * 角色：块级元素和行内元素
2. link

    ```
    <link rel="stylesheet"  type="text/css" href="" media="all">
    ```
3. 候选样式（并不是多有浏览器都支持），通过title属性实现

    ```
    <link rel="alternate stylesheet"  type="text/css" href="css/css01.css" title="red" media="all">
    <link rel="alternate stylesheet"  type="text/css" href="css/css02.css" title="blue" media="all">
    ```
    >当 rel="stylesheet" 则表示该样式为<b style="color:blue">首选样式</b>,当多个link标签
    都有title属性时，多个link外部样式只会有一个被导入（具体是哪一个不确定）,当多个link标签
    都没有title属性时则全部导入。

4. @import

    1. 语法与link不同
        ```
        <style>
                @import "css/css01.css";
                .div01css{
                    color: beige;
                }
        </style>
        ```
    2. 与link一样可以加载多个外部样式，但是没有候选样式，多个样式文件都会载入。

    3. 可以用于外部样式文件载入另一个外部样式文件，但是最好放在开始的位置。

         ```
         //css01.css

         @import "css/css02.css";
         .div01css{
            color: beige;
         }

         ```
       可以通过这种方式放在后面
        ```
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <style>
                p{
                    color: #47ff7a;
                }
            </style>
            <style>
                @import "css/css01.css";
            </style>
        </head>
        ```
5. 样式向下兼容

    如果老版本的浏览器无法识别style标签，则会把里面的样式代码当做文档输出，我们可以这样

    ```
    <style>
            <!--@import "css/css01.css";-->
            <!--
            p{
                color: #47ff7a;
            }
            -->
    </style>
    ```

### 选择器

1. 组合选择器

    ```
    <style type="text/css">
            *.txtcss{
                /*...*/
            }
            div.div01css{
                font-size: 2em;
                color:red

            }
            /*

            必须同时引用btncss，warning的情况

            <button class="btncss warning">...</button>
            */
            .btncss.warning{

            }

    </style>
    ```
    注意：

    ```
    <style type="text/css">
            /*div 后面有空格*/
            div .div01css.txtcss{
                font-size: 2em;
                color:red

            }
    </style>

    <div >
            <p class="div01css txtcss">hello world</p>
    </div>
    ```
    选择div内部，同时引用div01css txtcss的所有元素

    ```
        <style type="text/css">
                /*div 后面没有空格*/
                div.div01css.txtcss{
                    font-size: 2em;
                    color:red

                }
        </style>

        <div class="div01css txtcss">
                hello world
        </div>
    ```
    选择同时引用div01css txtcss的所有div元素
    >所有选择器区分大小写

2. css2中引入了属性选择器

    1. 将同时有href和title属性的a标签设置为粗体

        ```
        a[href][title]{font-weight:bold;}
        ```
    2. 当使用复合样式时，采用完全匹配方式

        ```
        p[class="pcss txtcss"]{color:red;}


        <p class="pcss">
            不匹配
        </p>
        <p class="txtcss pcss">
            不匹配
        </p>
        <p class="pcss txtcss">
            匹配
        </p>

        ```
3. a  a:link

    >a:link应用于所有带有href属性的a，不包括目标锚点，而a{} 应用于所有a标签。
    >伪类的定义顺序建议为：

    >link-visited-focus-hover-active

4. 选择器的权重(优先级)
    * id选择器                           0,1,0,0
    * 类选择器，属性选择器,伪类选择器         0,0,1,0
    * 标签选择器,伪元素选择器               0,0,0,1
    * 组合符和通配符                       0,0,0,0
    * 内联样式(优先级最高)                  1,0,0,0

    ```
        /* 0,0,1,1 */
        p.div01css{
            color: red;
        }
        /* 0,0,1,0 */
        .div01css{
            color: blue;
        }

        /* 0,1,0,1 */
        #div01 p{
            color: blue;
        }

        /* 0,1,0,0 */
        #p01{
            color: yellow;
        }
        /* 0,0,0,0 */
        #div01{
            color: yellow;
        }
        <!--最终为蓝色-->
        <div id="div01">
            <p class="div01css" id="p01">
                hello world <em>nihao</em>
            </p>
        </div>
    ```

    当权重相同时，采用就近原则
    ```
        body p{
            color: blue;
        }
        div p{
            color: red;
        }
        <!--最终为红色-->
        <div id="div01">
            <p class="div01css" id="p01">
                hello world <em>nihao</em>
            </p>
        </div>

    ```
    ```

        div p{
            color: red;
        }
        body p{
            color: blue;
        }
        <!--最终为蓝色-->
        <div id="div01">
            <p class="div01css" id="p01">
                hello world <em>nihao</em>
            </p>
        </div>

    ```
    下面这种情况叫做<b style='color:blue'>继承</b>，继承没有权重（连0都没有）。
    ```

            div{
                color: red;
            }
            body{
                color: blue;
            }
            <!--最终为红色-->
            <div id="div01">
                <p class="div01css" id="p01">
                    hello world <em>nihao</em>
                </p>
            </div>

    ```

    下面情况是，0权重优先级大于无权重
    ```

            div{
                color: red;
            }
            body{
                color: blue;
            }
            /*权重为 0,0,0,0*/
            *{
                color:yellow;
            }
            <!--最终为黄色-->
            <div id="div01">
                <p class="div01css" id="p01">
                    hello world <em>nihao</em>
                </p>
            </div>

    ```
    >所以我们要尽量不用通配符，因为他会阻断继承链（这种阻断是无意的）。


5. 重要申明

    >重要申明必须放在样式属性的最后（分号之前），CSS内部机制把所有重要申明分为一组，非
    重要申明分为一组，当下面发生：

    ```
        p{
            color: red !important; /* winner*/
        }
        #p01{
            color: blue ;
        }
    ```
    重要申明优先级大于权重（非重要申明）

    ```
        p{
            color: red !important;
        }
        #p01{
            color: blue !important ;/* winner*/
        }
    ```
    >当全部为重要申明时，比较各自选择器的权重值

6. 典型案例

    ```
        a:link{
            color: blue;
        }
        a:hover{
            color: red;
        }
        a:active{
            color: green;
        }
        a:visited{
            color: yellow;
        }

    ```
    上面四组样式声明权重相同（0，0，1，1），所以后出现的起作用。当前情况下，未访问的
    链接四个效果正常显示，已访问的链接只有最后一种效果（始终为黄色）。

    如果顺序为a,h,l,v.则任何情况下都不会显示a,h。

    如果顺序为l,h,v,a 则只有未访问的有悬停效果（红色效果）。

    所以，为了不出现这样的复杂现象，可以如下解决
    ```
        a:link{
            color: blue;
        }
        a:visited{
            color: yellow;
        }
        a:link:hover,a:visited:hover{
            color: red;
        }
        a:link:active,a:visited:active{
            color: green;
        }

    ```
7. web安全色


    >不同的平台（Mac、PC等）有不同的调色板，不同的浏览器也有自己的调色板。
    这就意味着对于一幅图，显示在Mac上的Web浏览器中的图像，与它在PC上相同浏览器中显示的效果可能差别很大。
    选择特定的颜色时，浏览器会尽量使用本身所用的调色板中最接近的颜色。如果浏览器中没有所选的颜色，
    就会通过抖动或者混合自身的颜色来尝试重新产生该颜色。

    这些颜色使用了一种颜色模型，在该模型中，可以用相应的16制进制值00、33、66、99、CC和FF来表达三原色（RGB）中的每一种。
    这种基本的Web调色板将作为所有的Web浏览器和平台的标准，它包括了这些16进制值的组合结果。
    这就意味着，我们潜在的输出结果包括6种红色调、6种绿色调、6种蓝色调。6*6*6的结果就给出了216种特定的颜色，
    这些颜色就可以安全的应用于所有的Web中，而不需要担心颜色在不同应用程序之间的变化。

8. 字体

        由于同一字体有不同的称呼，同一字体还有很多的变形字体。所以CSS2定义了5中字体系列。

        * Serif
        * Sans-Serif
        * Monospace
        * Cursive
        * Fantasy


    1. CSS 的 font-family 属性可以这么写

        （中文字体之前的「...」代表西文字体，根据自己的口味选择就好）：控制（为 Windows 选择微软雅黑，为 Linux 选择文泉驿微米黑）：
        ```
        font-family: ..., "Hiragino Sans GB", "Microsoft YaHei",
                     "WenQuanYi Micro Hei", sans-serif;
        ```
        为什么不把中易宋体（SimSun）、华文黑体（STHeiti［10.6 之前］或 Heiti SC［从 10.6 开始］）
        和 Droid Sans 写出来？因为它们是系统默认字体，
        以上字体都没有的话就会自动调用。除非你的用户中很多人的系统 locale 都不是中文，
        否则不必写出 STHeiti 之类（如果要写，请把它写在 Hiragino Sans GB 和 Microsoft YaHei 中间）。
        中易宋体（SimSun）尽管身为宋体，在 Windows 中却也是简体中文的默认 sans-serif 字体。

        注意：把冬青黑体放在这么前面会在某些情况下出问题，详见本答案第四部分。
        自由（仅在 OS X 上尽量使用冬青黑体简体中文，放任其他平台使用默认字体）：

    2. font-family: ..., "Hiragino Sans GB", sans-serif;

        这个方案没法控制 Windows 到底用中易宋体还是微软雅黑，于是正文字号的效果或许见仁见智，
        但大字号时如果用的是中易宋体就非常难看了，所以可以为 Windows 把所有大字号文本的 CSS
        改成「控制」方案。注意：把冬青黑体放在这么前面会在某些情况下出问题，详见本答案第四部分。
        不要轻易在 font-family 属性里写上中易宋体（SimSun）。因为如果你写了它，
        为了避免安装了 Office 的 OS X 调用它来显示，你就得把冬青黑体和华文黑体都列在它前面。
        而把中易宋体（SimSun）和华文黑体这样的系统默认字体写出来实在也没有什么必要。
        不要轻易把中文网页的 font-family 写成以「serif」结尾，因为如果列出的字体都没有，
        系统会按照「serif」的指示去用归于 serif 的中文字体，这样不符合我们尽量使用黑体的原则。

    3. 基于上面提到的这两个方案，还有各种中间形态可以选择。另一个常见做法：font-family: ..., sans-serif;
    ——即完全由各平台自己决定使用什么中文字体。这是很常见的方案，豆瓣、知乎等网站都是如此。
    但因为这个方案和这个问答的初衷不符，所以我没有把它列入讨论范畴。










