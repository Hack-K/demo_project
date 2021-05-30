/**
 * 注册子应用
 */
 const express =require('express')
 const User = require('../model/user')
 

 const regApp =express()

 //加载注册页
 regApp.get('/',(req,res) =>{
    res.render('reg',{msg:''})
 })

 //实现注册操作
 regApp.post('/',(req,res,next)=>{
   let {username,password,email,password_re}=req.body
   console.log({username,password,email,password_re})
   User.reg(username,password,email,password_re).then(result =>{
      if(result){
         //session存储(key = value)(键值对)
         req.session.user =result
         res.redirect('/login')
      }else{
         res.render('reg',{msg:'注册失败!用户名或密码错误'})
      }
   }).catch(err=>{
       next(err)
   })
})

 module.exports =regApp