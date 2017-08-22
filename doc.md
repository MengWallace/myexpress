## app.js 启动文件，或者说是入口文件
## package.json 存储工程的信息及模块依赖，在dependencies中添加依赖的模块时，运行 npm install
### npm会检查当前目录下的package.json，并自动安装所有指定的模块
## node_modules 在package.json中添加依赖的模块并指定安装后，模块会存放在这个文件夹下
## public 存放images/css/js文件
## routes 存放路由文件
## views 存放视图文件，或者说是模板文件
## bin 存放可执行文件
## express 路由规则 app.get()和get.post(); 一个参数都为请求的路径，第二个参数为处理请求的回调函数，回调函数由两个参数，分别为req和res，代表请求信息和响应信息。路径请求及对应的获取路径有以下几种方式（1）req.query : 处理get请求，获取get请求参数。（2）req.params:处理/:xxx形式的get或post请求，获取请求参数。（3）req.body: 处理post请求，获取post请求体。（4）req.param():处理get和post请求，但查找优先级由高到低req.params-req.body-req.query
# 模板引擎
## <% code %>:javascript代码 <%=code显示替换过HTML特殊字符的内容 %> <%-code%> 显示原始HTML
