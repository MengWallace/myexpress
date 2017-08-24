var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var settings = require('./settings');

//引入模块
var app = express();// 生成一个express实例app

//引入会话支持模块
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放视图文件的目录，即存放模板文件的地方；_dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('view engine', 'ejs');//设置视图模板引擎为ejs

app.use(flash());

app.use(session({
	secret:settings.cookieSecret,
	key:settings.db,// cookie name
	cookie:{
		maxAge:1000*60*24*24*30
	},//30天
	resave: false,
  	saveUninitialized: true,
	store: new MongoStore({
		// db:settings.db,
		// host:settings.host,
		// port:settings.port,
		url: 'mongodb://localhost/blog'
	})
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));// 加载日志的中间件
app.use(bodyParser.json());// 加载解析json文件的中间件
app.use(bodyParser.urlencoded({ extended: false })); // 加载解析urlencode请求体中的中间件
app.use(cookieParser()); // 加载解析cookie的中间件 
app.use(express.static(path.join(__dirname, 'public'))); // 设置public文件夹为存放静态文件目录

// app.use('/', index);// 路由控制器
// app.use('/users', users); // 路由控制器
index(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发环境下的错误处理器
// if(app.get('env') === 'development') {
// 	app.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.render('error', {
// 			message:err.message,
// 			error:err
// 		});
// 	});
// }

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // 到处app实例供其他模块调用
