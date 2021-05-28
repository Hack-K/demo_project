/**
 * 访问量数据模型
 */
 module.exports=class Pv extends require('./model'){

    /**
     * 获取总访问量
     */
    static getTotal(){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT sum(hits) as total from pv'
            this.query(sql).then(results=>{
                resolve(results[0].total)
            }).catch(err=>{
                console.log('获取总访问量失败:${err.message}')
                reject(err)
            })
        })
    }
    /**
     * 获取全部访问量
     */
     static getAll(){
        return new Promise((resolve,reject)=>{
            let sql ='SELECT `time`,hits from pv order by `time` asc'
            this.query(sql).then(results=>{
                resolve(results)
            }).catch(err=>{
                console.log('获取全部访问量失败:${err.message}')
                reject(err)
            })
        })
    }

}