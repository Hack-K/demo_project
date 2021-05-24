/**
 * 登录子应用
 */
 const express =require('express')
 const User = require('../model/user')
 
 //文章子应用
 const loginApp =express()

 //加载登录页
 loginApp.get('/',(req,res) =>{
    res.render('login',{msg:''})
 })

 //实现登录操作
 loginApp.post('/',(req,res,next)=>{
   let {username,password}=req.body//解构赋值
   User.login(username,password).then(result =>{
      if(result){
         res.redirect('/')
      }else{
         res.render('login',{msg:'登录失败!用户名或密码错误'})
      }
   }).catch(err=>{
       next(err)
   })
})




 module.exports =loginApp