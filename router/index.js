/*
*首页子应用（首页路由）
*/

const express =require('express')
const article =require('../middleware/article')
const category =require('../middleware/category')

//首页子应用
const indexApp =express()

//加载首页页面
indexApp.get('/',[article.getHot,article.getList,category.getList],(req,res)=>{
    let {hots,articles,categories} =req
    res.render('index',{hots:req.hots,articles:req.articles,categories:categories})
})

module.exports =indexApp