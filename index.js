/*
*入口模块
*/

const express =require('express')
const session = require('cookie-session')

//创建主应用
const app =express()

//模板引擎的设置
app.set('view engine','html')
app.set('views',`${__dirname}/views`)
app.engine('html',require('ejs').renderFile)

//静态资源配置
app.use(express.static('static'))

//POST请求处理
app.use(express.urlencoded({ extended:true }))

//session配置
app.use(session({
    keys:['secret'],
    maxAge:60*1000*30
}))

//调用首页子应用
app.use(/\/(index)?/,require('./router/index'))
//调用文章子应用
app.use('/article',require('./router/article'))
//调用搜索子应用
app.use('/search',require('./router/search'))
//调用登录子应用
app.use('/login',require('./router/login'))
//调用注册子应用
app.use('/reg',require('./router/reg'))


//进入后台的权限验证(('/admin/?*'):给所有的后台页面加上权限验证
app.use('/admin/?*',require('./middleware/auth').alloToAdmin)
//调用后台首页
app.use(/\/admin\/(index)?/,require('./router/admin/index'))
//调用后台文章管理
app.use('/admin/article',require('./router/admin/article'))
//调用后台类目管理
app.use('/admin/category',require('./router/admin/category'))
//调用后台日志管理
app.use('/admin/log',require('./router/admin/log'))
//调用后台账户管理
app.use('/admin/account',require('./router/admin/account'))

//退出操作
app.get('/user/logout',(req,res)=>{
    req.session.user =null
    res.render('login',{msg:'退出成功'})
})

//监听服务
app.listen(3000)