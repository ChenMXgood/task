# fruit
 fruit
1.项目文件夹结构
	static	静态路由提供的文件
			reg	--注册页面
			log	--登录界面
	updatas	上传的文件和数据
			reg.txt----存储用户信息
	views	模板页面（ejs使用render()）
	node_modules	不用说了吧
2.项目基本效果
	请求域名-------发送登录页面
	登录
		1.成功-------发送登录成功页面：显示欢迎xxx登录
		2.失败
			1.账号或者密码错误---再次发送首页
			2.账号不存在-------发送注册页面
	注册
		1.账号已存在-------再次发送注册页面
		2.账号不存在-------发送登录页面
		

3.新的express知识点
	res.render()	作用同send()-------渲染并发送模板页面  
	express+ejs模板	后台模板页面的操作
	res.redirect()	重定向(强制页面访问指定的请求)
4.js语法
	string操作 str.split("+")
	for in 循环
	JSON语法
	return
	break
	continue
