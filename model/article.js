/**
 * 文章数据模型
 * resolve：传递数据至下一个.then语句中。
 * reject：抛出一个异常，在最近的.catch()中接收并且处理他
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
    /**
     * 上一篇文章
     * @param {integer} id 当前文章的编号
     */
    static getPrevArticle(id){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title from article where id < ? order by id desc limit 1'
            this.query(sql,id).then(results=>{
                resolve(results[0])
            }).catch(err=>{
                console.log('获取上一篇文章失败:${err.message}')
                reject(err)
            })
        })
    }

    /**
     * 下一篇文章
     * @param {integer} id 当前文章的编号
     */
     static getNextArticle(id){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,title from article where id > ? order by id asc limit 1'
            this.query(sql,id).then(results=>{
                resolve(results[0])
            }).catch(err=>{
                console.log('获取下一篇文章失败:${err.message}')
                reject(err)
            })
        })
    }
     /**
     * 总博文数
     */
      static getCount(){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT count(1) as `count` from article'
            this.query(sql).then(results=>{
                resolve(results[0].count)
            }).catch(err=>{
                console.log('获取总博文数失败:${err.message}')
                reject(err)
            })
        })
    }
}