/*
*首页子应用（首页路由）
*/

const express =require('express')
const article =require('../middleware/article')

//首页子应用
const indexAPP =express()

//加载首页页面
indexAPP.get('/',[article.getHot],(req,res)=>{
    res.render('index',{host:req.hots})
})

module.exports =indexAPP