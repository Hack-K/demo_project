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

    /**
     * 获取文章列表
     */
    static getList(){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title,content,`time` FROM article ORDER BY TIME DESC'
            this.query(sql).then(results=>{
                resolve(results)
            }).catch(err=>{
                console.log('获取文章列表失败:${err.message}')
                reject(err)
            })
        })
    }

    /**
     * 获取指定类目下的文章列表
     */
     static getListByCategoryId(id){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title,content,`time` FROM article WHERE category_id =? ORDER BY TIME DESC'
            this.query(sql,id).then(results=>{
                resolve(results)
            }).catch(err=>{
                console.log('获取指定类目下的文章列表失败:${err.message}')
                reject(err)
            })
        })
    }

     /**
     * 获取指定关键词的文章列表
     * @param {string} keyword 关键词
     */
      static getListBykeyword(keyword){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title,content,`time` FROM article WHERE title LIKE ? ORDER BY TIME DESC'
            this.query(sql,`%${keyword}%`).then(results=>{
                resolve(results)
            }).catch(err=>{
                console.log('获取指定关键词的文章列表失败:${err.message}')
                reject(err)
            })
        })
    }

    /**
     * 获取指定文章的详情
     * @param {integer} id 文章编号
     */
    static getArticleById(id){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT a.id,a.title,a.content,a.`time`,a.hits,a.category_id,c.name from article a,category c where a.id =? and a.category_id = c.id'
            this.query(sql,id).then(results=>{
                resolve(results[0])
            }).catch(err=>{
                console.log('获取指定文章的详情失败:${err.message}')
                reject(err)
            })
        })
    }
}