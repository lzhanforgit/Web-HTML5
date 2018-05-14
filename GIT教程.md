利用WebStorm来管理你的Github
==

1. 安装git

    在Windows上安装Git
在Windows上使用Git，可以从[Git官网](https://git-scm.com/downloads)直接下载安装程序，（网速慢的同学请移步[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)），然后按默认选项安装即可。

    安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

2. Git配置 git config
    
    **mac os**
    /etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。若使用 git config 时用 –system 选项，读写的就是这个文件。 ()
    ~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。若使用 git config 时用 –global 选项，读写的就是这个文件。 (目录：/Users/lzhan/.gitconfig)
    当前项目的 Git 目录中的配置文件（也就是工作目录中的 .git/config 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。

    **windows**
    在 Windows 系统上，Git 会找寻用户主目录下的 .gitconfig 文件。主目录即 $HOME 变量指定的目录，一般都是 C:\Documents and Settings\$USER(比如C:\Users\Administrator\.gitconfig)。

    此外，Git 还会尝试找寻 /etc/gitconfig 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。
    
    **命令行配置用户信息**
    
    ```
        $ git config --global user.name "wyndam"
        $ git config --global user.email "only.night@qq.com"
    ```

3. 查看用户配置

    ```
        git config --list
    ```
    
4. add

    ```
        git add readme.txt
    ```
5. commit

    
    ```
        git commit -m '说明文字'
    ```
    
    >第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

    >第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
    
    **案例**    
    第一次修改 -> git add -> 第二次修改 -> git commit
    
    你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。
    
6. checkout

    ```
        git checkout -- readme.txt
    ```
    命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

    一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；就是把版本库的数据签出覆盖本地的文件。
    
    一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。但是如果再次COMMIT那么之前缓存区的数据还是在的，这时候不仅要用缓存区的数据覆盖工作区的数据，同时还要把缓存区的数据清空，如下
    
    ```
        git reset HEAD readme.txt
        //或者
        git reset --hard HEAD
    ```
    
    >git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。
    总之，就是让这个文件回到最近一次git commit或git add时的状态。
    
6. 查看文件状态

    ```
     git status
    ```
4. 查看提交日志

    git log命令显示从最近到最远的提交日志
    
    ```
        $ git log --pretty=oneline
    ```
5. 回退到历史版本

    在Git中，用HEAD表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD\^，上上一个版本就是HEAD\^\^，当然往上100个版本写100个\^比较容易数不过来，所以写成HEAD~100。
    
    ```
    $ git reset --hard HEAD^
    ```
    
    最新的那个版本append GPL已经看不到了！好比你从21世纪坐时光穿梭机来到了19世纪，想再回去已经回不去了，肿么办？

    办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个append GPL的commit id是3628164...，于是就可以指定回到未来的某个版本：

    ```
    $ git reset --hard 3628164
    ```
`HEAD is now at 3628164 append GPL
版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了

    >在Git中，总是有后悔药可以吃的。当你用$ git reset --hard HEAD\^回退到add distributed版本时，再想恢复到append GPL，就必须找到append GPL的commit id。Git提供了一个命令git reflog用来记录你的每一次命令：
    
    ```
        git reflog
    ```

1. 删除文件

    ```
    
    git rm test.txt
    git commit -m "remove test.txt"
    ```
    
1. 忽略特殊文件

    在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。
    
    ```
        # Windows:
        Thumbs.db
        ehthumbs.db
        Desktop.ini
        
        # Python:
        *.py[cod]
        *.so
        *.egg
        *.egg-info
        dist
        build
        
        # My configurations:
        db.ini
        deploy_key_rsa
        *.xml
        *.iml
        
        logs/*
        !.gitkeep
        node_modules/
        bower_components/
        tmp
        .DS_Store
        .idea
    
        .idea/


    ```
1. 在Webstorm中配置Github

    1. 首先你得有一个Github的账号.
    2. 点击Webstorm设置
    3. 进入设置面板后，直接在左上角搜索github（这个也算是Webstorm方便功能之一，很快速定位设置项），
        然后填入你github的账户名和密码，然后按一下Test看看是否连接成功.如果成功会跳出connection success!对话框。
        
    4. 成功连接后，你就已经登录到Github账户了，但这还不够，你还得让Webstorm能够支持到Git操作，那么我们首先先去https://code.google.com/p/msysgit/downloads/list下载Git，
        安装后，在Webstorm中查找Git，然后配置好到Git的安装目录
        >验证是否成功，输入命令行。输出git版本表示git安装成功。
         
         	git --version
        >在本地git中添加你得git账户和邮箱，用于每次提交时记日志(log）
         
         	git config --global user.name "你的注册用户名"
         	git config --global user.emall "你的注册邮箱"
    5. 配置好后还不够，因为运行Git需要本机的SSH，SSH的作用是让本地版本库与远程版本库通信，
      也就是你在本地修改好的代码，需要同步到服务器上的时候，就需要这个SSH密钥来通讯，
      那么我们先找到Git的安装目录中的“Git Bash.vbs”.
        
        > 在MAC系统下,.ssh目录是隐藏文件。
        默认目录在'用户/当前系统用户名/.ssh'
        
        >打开terminal.app
      
            $ open ~/.ssh  
            
    6. 检验是否存在.ssh目录
        
        cd ~/.ssh
        
       >如果出现"No such file or directory",表明没有该目录。
       
       *生成秘钥
       
       	ssh-keygen -t rsa -C "macbookpro"
       	//命令要求输入密码，不用输，三个回车即可。
       
       	//执行成功后，会在主目录.ssh路径下生成两个文件：
       	//id_rsa私钥文件；id_rsa.pub公钥文件； 

        >成功后，找到你的用户目录下的C:\Users\你的计算机用户名.ssh\id_rsa.pub，
        >用记事本打开，并复制里面的SSH码
        
    7. 配置github.com的SSH
        
        >打开https://github.com/settings/profile,点击 SSH&GPG keys.
         点击 New SSH keys.标题随便写。把id_rsa.pub里面的代码粘贴进去。
2. 在Webstorm中使用Github
    
    1. 链接github数据仓库
    >webstorm 菜单点击 "VCS/checkout from version controll/git"
    
    >输入url,本地目录后,点击clone
    
    2. 当你在文件夹中添加文件时，文件会在左侧的项目管理面板中显示为红色，说明这个文件是在原有的Github项目中没有的
    
    3. 将这个文件先add到本地github库中
    
    4. commit

