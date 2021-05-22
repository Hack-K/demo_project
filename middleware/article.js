const Article = require('../model/article')

/**
 * 文章中间介
 */
module.exports ={
    /**
     *获取热门文章
     */
    getHot:(req,res,next) =>{
        Article.getHot(3).then(results =>{
            req.hots =results
            next()
        }).catch(err =>{
            next(err)
        })
    }
}