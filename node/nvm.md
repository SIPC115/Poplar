# nvm - nodejs版本控制管理工具
---
### 首先克隆下载

>git clone https://github.com/creationix/nvm.git ~/.nvm


### 添加nvm自启动命令
>``~/.bashrc`` ,  ``~/.profile`` , －－－－用`bash` 要改

>``~/.zshrc`` －－－用`zsh`要改   

#### 都是添加  `source ~/.nvm/nvm.sh `

#### 然后再执行  source  ~/.zshrc 或者 source  ~/. profile  
也可以重启你的`shell` 目的是重新加载

#### nvm 使用

>nvm install v4.4.0  安装4.4.0版本

>nvm use v4.4.0   使用4.4.0版本

>nvm ls  显示你已有的node版本可以用use来切换
