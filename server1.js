var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var url = "mongodb://localhost:27017";
//设置使用的模板引擎（会自动完成require动作）;
app.set('view engine', 'ejs');
//静态路由：注册和登录页面
app.use('/', express.static('./static'));
app.get('/', function(req, res) {
	res.redirect('log');
})
app.get('/login', function(req, res) {
	// var data=req.query;
	var name = req.query.name;
	var psw = req.query.psw;
	MongoClient.connect(url, function(err, client) {
		if(err) {
			console.log("数据库连接失败");
			res.send('false')
		} else {
			console.log("数据库连接成功");
			// 插入数据
			// 获得一个数据库对象    
			var db = client.db('test'); // 获得test数据库对象
			//数据库对象，调用collection（集合名）.insertOne{()}
			//                                     insertMany{[(),(),()]}
			db.collection('a').find({ name: name }).toArray(function(err, result) {
				if(result.length == 0) {
					res.redirect('/reg');
					client.close();
				} else {
					console.log(result.length);
					console.log('登陆成功')
					var datapsw = result[0].psw
					if(psw == datapsw) {
						res.render('home', req.query); //{name:b,psw:b}
					} else {
						client.close();
						res.redirect('/log')
					}
				}
			});
		}
	})
})
app.get('/register', function(req, res) {
	var name = req.query.name;
	var psw = req.query.psw;
	var url = "mongodb://localhost:27017";
	MongoClient.connect(url, function(err, client) {
		if(err) {
			console.log("数据库连接失败");
			res.end('false')
		} else {
			console.log("数据库连接成功");
			// 插入数据
			// 获得一个数据库对象    
			var db = client.db('test'); // 获得test数据库对象
			//数据库对象，调用collection（集合名）.insertOne{()}
			//insertMany{[(),(),()]}
			db.collection('a').find({ name: name }).toArray(function(err, result) {
				console.log
				if(result.length == 0) {
					db.collection('a').insertOne(req.query, function(err, result) {})
					client.close();
					res.redirect('/log')
				} else {
					client.close();
					res.redirect('/log')
				}
			});
		}
	})
})
app.get('/home', function(req, res) {
	res.render('home')
})
app.get('/about', function(req, res) {
	res.render('about')
})
app.get('/menu', function(req, res) {
	res.render('menu')
})

app.listen(5566, function() {
	console.log('server is running');
})