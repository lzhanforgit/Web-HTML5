1. 介绍

    Bower是一个客户端技术的软件包管理器，它可用于搜索、安装和卸载如JavaScript、HTML、CSS之类的网络资源。其他一些建立在Bower基础之上的开发工具，如YeoMan和Grunt，这个会在以后的文章中介绍。

2. 安装node环境:node.js

3. 安装Git，bower从远程git仓库获取代码包

4. 安装bower

    ```
        npm install -g bower
    ```

5. 使用

    查看bower 帮助

    ```
        bower
    ```

6. 自定义包的安装目录

   首先进入项目根目录下，新建文件1.txt

   然后命令行进入项目目录下，输入命令重命名该文件为.bowerrc：

   ```
       rename 1.txt .bowerrc
   ```

   效果如下

   ```
        {
          "directory": "app/bower_components",
          "interactive": false
        }
   ```

7. bower 初始化

    ```
        bower init
    ```
    会提示你输入一些基本信息，根据提示按回车或者空格即可，然后会生成一个bower.json文件，用来保存该项目的配置.

8. bower 安装包

    ```
        bower install jquery --save

        bower info jquery

        bower update

        bower search bootstrap

        bower uninstall bootstrap


    ```