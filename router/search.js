/*
*搜索子应用
*/

const express =require('express')
const article =require('../middleware/article')
const category=require('../middleware/category')


//首页子应用
const searchApp =express()

//加载首页页面
searchApp.get('/',[article.getListBykeyword,category.getList],(req,res)=>{
    let {articles,categories} =req
    res.render('search',{articles:articles,categories:categories,keyword:req.query.keyword})
})

module.exports =searchApp