利用WebStorm来管理你的Github
--
###1. 安装环境
1. 安装git

    在Windows上安装Git
在Windows上使用Git，可以从[Git官网](https://git-scm.com/downloads)直接下载安装程序，（网速慢的同学请移步[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)），然后按默认选项安装即可。

    安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

2. Git配置 git config
    
    **mac os**
    
    /etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。若使用 git config 时用 –system 选项，读写的就是这个文件。 
    
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
    
-----
###2. 创建本地仓库

 
1. ####创建本地仓库

	英文名repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

	* Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。

	1. 创建空目录

            mkdir mygit
            cd mygit
            pwd
            <!--pwd：显示当前目录-->
            <!--我的：/c/Users/31832/mygit-->

	3. 通过git init命令把这个目录变成Git可以管理的仓库：

            git init
            <!--显示：Initialized empty Git repository in C:/Users/31832/mygit/.git/-->

		* 目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改。
		* 如果没有.git目录，因为目录默认是隐藏的，用ls -ah命令就可以看见。
		* 本文件的改动，比如TXT文件，网页，所有的程序代码等等，版本控制系统可以告诉你每次的具体改动。图片、视频这些二进制文件，虽然由版本控制系统管理，但没法跟踪文件的变化，只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道
		* Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动的
		* 不要使用Windows自带的记事本编辑任何文本文件，会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，建议你下载Notepad++代替记事本，不但功能强大，而且免费！记得把Notepad++的默认编码设置为UTF-8


	4. 编写文件

            vi readme.txt
            <!--编辑一个名字为readme的txt文件-->
            <!--接下来那你会进入一个编写页面-->
   5. 把文件添加到缓冲区

            git add readme.txt
            git add *.txt //添加所有记事本文件到缓冲区
            
       >会出现错误：warning: LF will be replaced by CRLF in readme.txt.
                      The file will have its original line endings in your working directory
                      
       >错误原因：windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add时出现提示
       
       >解决方法：rm -rf .git  // 删除.git
                     git config --global core.autocrlf false  //禁用自动转换
                     git add readme.txt  // 重新把文件添加到仓库，
                     
                     
    	1. git add .

    		git add . ：他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。
    	2. git add -u

    		git add -u ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区。add -u 不会提交新文件（untracked file）。（git add --update的缩写）
    	2. git add -A在功能上看似很相近，但还是存在一点差别

			git add -A ：是上面两个功能的合集（git add --all的缩写）
	4. 把文件提交到仓库
		
			git commit -m '说明文字'
			git commit -m "write readme file"
			//1. -m 后面的文字是用来说明本次操作的，会记录在历史记录里
			//2. 正确显示的内容：
                        [master (root-commit) ac7116d] write readme file
                        1 file changed, 1 insertion(+)
                        create mode 100644 readme.txt
			//3.  1 file changed：1个文件被改动
			//4.   1 insertion(+) 插入了一行内容（readme.txt有一行内容）
		* commit可以一次提交很多文件，所以可以多次add不同的文件，然后再一起提交
    	
    	>第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

    	>第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
    
    	**案例**    
    	
	    第一次修改 -> git add -> 第二次修改 -> git commit
	    
	    你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

---

###3. 修改操作和回溯版本


1. 查看修改

    1. git status //仓库当前的状态 比如什么被修改了

            vi readme.txt //进入文档后，修改一下文档，我添加了Git
            git status
            结果：On branch master
                Changes not staged for commit:
                  (use "git add <file>..." to update what will be committed)
                  (use "git checkout -- <file>..." to discard changes in working directory)

                        modified:   readme.txt

                no changes added to commit (use "git add" and/or "git commit -a")
            //上面的命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。

    2. git diff  //查看修改了什么

           	git diff
           
           	结果：diff --git a/readme.txt b/readme.txt
                index fdc793e..6a331c8 100644
                --- a/readme.txt
                +++ b/readme.txt
                @@ -1 +1,2 @@
                 python
                +Git
    3. 提交修改

            git add readme.txt
            git commit -m "change readme.txt"
            结果：[master b3252f8] change readme.txt
                  1 file changed, 1 insertion(+)
                  // 告诉我们一个我们一个文件被改变了
            git status
            结果：On branch master
                 nothing to commit, working tree clean
                 //Git 告诉我们当前没有需要提交的


2. 回溯

    1. git log  历史记录

             vi readme.txt //在编辑一次，添加hello
             git add readme.txt
             git commit -m "add hello to readme.txt"
             git log  //可以看到三次修改
             git log --pretty=oneline // 变换输出信息的格式

    2. 退回到之前的版本

        1. HEAD 最新的提交
           HEAD^ 上一个版本
           HEAD^^上上一个版本
           HEAD~100 往上100个版本

        2. git reset

                git reset --hard HEAD^
                结果：HEAD is now at b3252f8 change readme.txt
                vi readme.txt //看看txt的内容，是否回到上一个版本
                git log  //可以看到 log中已经没有了add hello to readme.txt 的操作
                
        3. 回到未来（add hello to readme.txt这个版本相对于现在来说是未来）

		    	git reset --hard df854
		    >如果命令行窗口还没有被关掉，你就可以顺着往上找，找到：df85406fa324d1f9ce8433fbd5916418bd0a424e (HEAD -> master) add hello to readme.txt
		    
		    >版本号无需写全，复制前几个就可以
		    
		    >你可以看一下readme.txt的内容，看是否成功“穿越”
		4. 在关掉命令的情况下穿越
		
		    1. git reflog //用来记录你的每一次命令
		    
		    		利用git reflog 可以看到每个版本名和操作备注
		    	
		    		git reset --hard df854
                
---
###4. git工作区、暂存区、版本库之间的关系

1. 区分三者的关系

	  在初始化git版本库之后会生成一个隐藏的文件 .git ，可以将该文件理解为git的版本库 repository，而我们自己建立的项目文件夹即工作区 working directory ,在.git 文件夹里面还有很多文件，其中有一个index 文件 就是暂存区也可以叫做 stage ,git还为我们自动生成了一个分支master以及指向该分支的指针head
	  
		
	1. git diff 比较的是工作区和暂存区的差别
  	2. git diff --cached 比较的是暂存区和版本库的差别
  	3. git diff HEAD 可以查看工作区和版本库的差别          
                

2. 撤销操作 checkout 

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
    

1. 删除文件

    ```
    
    git rm test.txt
    git commit -m "remove test.txt"
    ```
    用 git rm 来删除文件，同时还会将这个删除操作记录下来；
用 rm 来删除文件，仅仅是删除了物理文件，没有将其从 git 的记录中剔除。

	直观的来讲，git rm 删除过的文件，执行 git commit -m "abc" 提交时，会自动将删除该文件的操作提交上去。

	而用 rm 命令直接删除的文件，单纯执行 git commit -m "abc" 提交时，则不会将删除该文件的操作提交上去，需要在执行commit的时候，多加一个-a参数，
即rm删除后，需要使用git commit -am "abc"提交才会将删除文件的操作提交上去。
    
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
    
---
###5. 添加远程库
1. 在github上新建远程库
2. 在本地的仓库下运行命令：
		
	**ssh**
	
		git remote add origin git@github.com:自己GitHub账户名/你要提交的库名.git 
		
	**https**
	
		git remote add origin https://github.com/lzhanforgit/test.git
	
	>添加之后远程库的名是origin
3. 把本地库的所有内容推送到远程库上

		git push -u origin master


	由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
	
4. 从现在起，只要本地作了提交，就可以通过命令： git push origin master

5. 远程仓库管理

	1. 查看远程仓库

			git remote
			git remote show origin
	
		你也可以指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。

		$ git remote -v
		origin	https://github.com/schacon/ticgit (fetch)
		origin	https://github.com/schacon/ticgit (push)
	2. 远程仓库重名

			git remote rename pb paul
	3. 删除远程仓库

			git remote rm paul
	2. git fetch

			 git fetch origin //抓取远程master分支
			 
	3. git merge

		合并远程分支到本地分支
		
	4. git fetch+git merge=git pull origin
		
	[参考链接](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)
5. 可能会出现SSH警告 yes就可以了

	// 当前在那个目录下，就提交哪个
	// git remote remove origin 删除链接

### 从远程库克隆
1. git clone git@github.com:自己GitHub账户名/库名.git
1. git clone https://github.com/自己GitHub账户名/库名.git

#### 创建与合并分支
1. git checkout -b dev //-b参数表示创建并切换 分支名叫dev
    = git branch dev
      git checkout dev

2. git branch //查看当前分支
3. git checkout master //切换回master分支
4. git merge dev // 合并分支
5. git branch -d dev //合并之后删除分支
6. git merge --no-ff -m "merge with no-ff" dev //强制禁用Fast forward模式，从分支历史上就可以看出分支信息
1. git stash //把当前工作现场“储藏”起来，等以后恢复现场后继续工作

---

### git fetch和git pull
* git fetch和git pull


	git fetch和git pull都可以将远端仓库更新至本地那么他们之间有何区别?想要弄清楚这个问题有有几个概念不得不提。

	* FETCH_HEAD： 是一个版本链接，记录在本地的一个文件中，指向着目前已经从远程仓库取下来的分支的末端版本。 
	* commit-id：在每次本地工作完成后，都会做一个git commit 操作来保存当前工作到本地的repo， 此时会产生一个commit-id，这是一个能唯一标识一个版本的序列号。 在使用git push后，这个序列号还会同步到远程仓库。

	1. 有了以上的概念再来说说git fetch 
	
		git fetch：这将更新git remote 中所有的远程仓库所包含分支的最新commit-id, 将其记录到.git/FETCH_HEAD文件中 
	
		git fetch更新远程仓库的方式如下：

			git fetch origin master:tmp 
			//在本地新建一个temp分支，并将远程origin仓库的master分支代码下载到本地temp分支
			git diff tmp 
			//来比较本地代码与刚刚从远程下载下来的代码的区别
			git merge tmp
			//合并temp分支到本地的master分支
			git branch -d temp
			//如果不想保留temp分支 可以用这步删除

		1. 如果直接使用git fetch，则步骤如下：

			创建并更新本 地远程分支。即创建并更新origin/xxx 分支，拉取代码到origin/xxx分支上。
			在FETCH_HEAD中设定当前分支-origin/当前分支对应，如直接到时候git merge就可以将origin/abc合并到abc分支上。
		2. git fetch origin 
		
			只是手动指定了要fetch的remote。在不指定分支时通常默认为master 
		3. git fetch origin dev 
		
			指定远程remote和FETCH_HEAD，并且只拉取该分支的提交。

	1. git pull 

		首先，基于本地的FETCH_HEAD记录，比对本地的FETCH_HEAD记录与远程仓库的版本号，然后git fetch 获得当前指向的远程分支的后续版本的数据，然后再利用git merge将其与本地的当前分支合并。所以可以认为git pull是git fetch和git merge两个步骤的结合。 
	git pull的用法如下：

			git pull <远程主机名> <远程分支名>:<本地分支名>
			//取回远程主机某个分支的更新，再与本地的指定分支合并。
	总结：
	
		因此，与git pull相比git fetch相当于是从远程获取最新版本到本地，但不会自动merge。如果需要有选择的合并git fetch是更好的选择。效果相同时git pull将更为快捷。

---
###6. 在Webstorm中配置Github

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
   5. 配置好后还不够，因为运行Git需要本机的SSH，SSH的作用是让本地版本库与远程版本库通信，也就是你在本地修改好的代码，需要同步到服务器上的时候，就需要这个SSH密钥来通讯，那么我们先找到Git的安装目录中的“Git Bash.vbs”.
        
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
        
      打开https://github.com/settings/profile,点击 SSH&GPG keys.
         点击 New SSH keys.标题随便写。把id_rsa.pub里面的代码粘贴进去。
   2. 在Webstorm中使用Github
    
    1. 链接github数据仓库
    
	    >webstorm 菜单点击 "VCS/checkout from version controll/git"
	    
	    >输入url,本地目录后,点击clone
    
    2. 当你在文件夹中添加文件时，文件会在左侧的项目管理面板中显示为红色，说明这个文件是在原有的Github项目中没有的
    
    3. 将这个文件先add到本地github库中
    
    4. commit

