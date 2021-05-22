/**
 * 文章数据模型
 */
module.exports=class Article extends require('./model'){

    /**
     * 获取热门推荐文章
     * @param {integer} num 条目数
     */
    static getHot(num){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title,content,`time` FROM article WHERE hot = 1 LIMIT ?'
            this.query(sql,num).then(results=>{
                resolve(results)
            }).catch(err=>{
                console.log('获取热门推荐文章失败:${err.message}')
                reject(err)
            })
        })
    }
}