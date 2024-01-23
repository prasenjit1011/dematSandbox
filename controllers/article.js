const article = require('../models/article');


exports.getArticleList = async (req, res, next) => {

    let fetchResult  = await article.fetchAll();
    let fetchData    = await fetchResult[0];
    const pageNo     = req.query.page ?? 0;

    return res.render('./article/list', {pageNo : pageNo, data:fetchData, pageTitle:'Article list using Asyn method with Mysql'});
}



exports.getArticleListing = (req, res, next) => {
    const pageNo     = req.query.page ?? 0;

    return article.fetchAll()
                    .then(([rows, fieldData])=>{
                        res.render('./article/list', {pageNo : pageNo, data:rows, pageTitle:'Article list using Asyn with then, catch with Mysql'});
                    })
                    .catch(err=>console.log(err));

}