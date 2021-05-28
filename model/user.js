const { static } = require('express');

/**
 * 用户数据模型
 */
module.exports =class User extends require('./model'){
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

    