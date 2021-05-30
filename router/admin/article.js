/**
 * 后台文章管理
 */
const express =require('express')
const article =require('../../middleware/article')
const articleApp=express()

articleApp.get('/',[article.getPage,article.getCount],(req,res)=>{
    let {user,pageList,articleCount} = req
    let size =5//每页显示五条
    let page ={}
    page.count =articleCount
    page.total =Math.ceil(page.count / size)
    page.list =pageList//进一步封装
    page.p=req.query.p? req.query.p : 1
    page.p=page.p > page.total? page.total : page.p
    page.p =page.p < 1 ? 1 : page.p
    res.render('admin/article/index',{user:user,page:page})
})

module.exports =articleApp