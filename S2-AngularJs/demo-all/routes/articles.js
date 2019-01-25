var express = require('express');
var articleDAO=require('../dao/articleDAO');
var router = express.Router();
router.get('/', function(req, res, next) {
    var index=1;
    var acount=3;
    var pages=1;
    if(req.query.index){
        index=req.query.index;
    }
  articleDAO.getBooks(index,acount,function (result) {
      console.log("routes,books"+JSON.stringify(result));

      pages=Math.ceil(result.total/acount);

       res.render('article',{pageAcount:pages,books:result.res});
  })

});

router.get('/manager', function(req, res) {
    res.render('article_angular');

});

router.get('/manager/getAll', function(req, res) {

    var index=1;
    var acount=5;
    var pages=1;
    if(req.query.index){
        index=req.query.index;
    }
    articleDAO.getBooks(index,acount,function (result) {
        console.log("routes,books"+JSON.stringify(result));

        pages=Math.ceil(result.total/acount);

        res.json({books:result.res});
    })
});
router.post('/', function(req, res, next) {
    var index=1;
    var acount=3;
    var pages=1;
    if(req.body.index){
        index=req.body.index;
    }
    articleDAO.getBooks(index,acount,function (result) {
        console.log("routes,books"+JSON.stringify(result));

        pages=Math.ceil(result.total/acount);

        res.json({books:result.res});
    })

});




module.exports = router;
