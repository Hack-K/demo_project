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
         res.render('/reg')
      }else if(!username){
         res.render('reg',{msg:'用户名不能为空'})
      }else if(!password){
         res.render('reg',{msg:'密码不能为空'})
      }else{
         res.render('reg',{msg:'注册成功，请登录'})
      }
   }).catch(err=>{
       next(err)
   })
})

 module.exports =regApp