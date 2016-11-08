# mongodb
---

###  安装：
mac/os x 10.11.3
`brew install mongodb`  版本3.2.4
启动 `mongod --config /usr/local/etc/mongod.conf`

ubuntu/linux 内核3.8
安装：`apt-get install mongodb` 版本2.0.4
启动 `mongod --config /etc/mongodb.conf`

自定义启动方式：
通过参数来替代配置文件启动
mongod --bind_ip 127.0.0.1 --port 27017 --dbpath ~/mongo/db --logpath ~/mongo/logs/mongodb.log  

两个命令：mongo && mongod
mongo — 进入数据库通过命令行管理，需要数据库已经开启。
mongod — 对mongod进行开启的工具


### 配置文件

高版本的配置文件与底版本不同但向下兼容

#### /usr/local/etc/mongod.conf  －－3.2.4

```shell
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1
```

#### /etc/mongodb.conf －－ 2.0.4

```shell
# mongodb.conf

# Where to store the data.
dbpath=/usr/local/var/mongodb

#where to log
logpath=/usr/local/var/log/mongodb/mongo.log

logappend=true

#bind_ip = 127.0.0.1
#port = 27017

# Enable journaling, http://www.mongodb.org/display/DOCS/Journaling
journal=true
```


`dbpath` 是数据库地址
`logpath` 是日志地址
`port` 是端口号
`bind_ip` 是限制从某IP地址访问
