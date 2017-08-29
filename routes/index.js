// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
var crypto = require('crypto');//生成散列值加密密码
User = require('../models/user.js');

module.exports  = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title:'主页',
			user: req.session.user,
			success: req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title:'注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.post('/reg', function(req, res) {
		var name = req.body.name;
		var password = req.body.password;
		var password_re = req.body['password-repeat'];

		//检验密码是否一致
		if(password_re != password) {
			req.flash('error','两次输入的密码不一致');
			return res.redirect('/reg');//返回注册页
		}
		//生成密码的MD5值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name : req.body.name,
			password : password,
			email : req.body.email
		});
		//检查用户名是否已存在
		User.get(newUser.name, function(err, user) {
			if(err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			if(user) {
				req.flash('error', '用户已存在');
				return res.redirect('/reg');//返回注册页
			}
			//如果不存在则新增用户
			newUser.save(function (err, user) {
				if(user) {
					req.flash('error', err);
					return res.redirect('/reg');//注册失败返回注册页
				}
				req.session.user = user;
				req.flash('success', '注册成功');
				res.redirect('/');//注册成功后返回主页

			});
		});
	})
	app.get('/login', function(req, res) {
		res.render('login', {
			title:'登录'
		});
	});
	app.post('/login', function(req, res) {
		
	});
	app.get('/nswbmw',function(req, res) {
		res.send('hello world');
	});
};