利用WebStorm来管理你的Github
==

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