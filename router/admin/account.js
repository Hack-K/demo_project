/**
 * 后台日志管理
 */
const express =require('express')

const accountApp=express()

accountApp.get('/',(req,res)=>{
    res.render('admin/account/index',{user:req.user})
})

module.exports =accountApp