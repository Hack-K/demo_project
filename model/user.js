const { static } = require('express');

/**
 * 用户数据模型
 */
module.exports =class User extends require('./model'){
    /**
     * 用户注册
     * @param {string} username 注册账号
     * @param {string} password 注册密码
     */
     static reg(username,password,email){
        return new Promise((resolve,reject) =>{
            let sql = 'insert into user (username,`password`,email) VALUES(?,?,?)'
            this.query(sql,[username,password,email]).then(results=>{
                resolve(results[0])
            }).catch(err=>{
                console.log('注册失败:' + err.message)
                reject(err)
            })
        })
    }
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
    static login(username,password){
        return new Promise((resolve,reject) =>{
            let sql = 'select id,username from `user` where username = ? and password = ?'
            this.query(sql,[username,password]).then(results=>{
                resolve(results[0])
            }).catch(err=>{
                console.log('登录失败:' + err.message)
                reject(err)
            })
        })
    }
    /**
     * 最后一次登录时间
     */
    static lastLoginTime(){
        return new Promise((resolve,reject) =>{
            let sql = "select `time` from `log` where handle = '登录' order by `time` desc limit 1"
            this.query(sql).then(results=>{
                resolve(results[0].time)
            }).catch(err=>{
                console.log('登录失败:' + err.message)
                reject(err)
            })
        })
    }
}

    