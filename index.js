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

//进入后台的权限验证(('/admin/?*'):给所有的后台页面加上权限验证
app.use('/admin/?*',require('./middleware/auth').alloToAdmin)

//调用后台首页
app.use(/\/admin\/(index)?/,require('./router/admin/index'))

//退出操作
app.get('/user/logout',(req,res)=>{
    req.session.user =null
    res.render('login',{msg:'退出成功'})
})

//监听服务
app.listen(3000)