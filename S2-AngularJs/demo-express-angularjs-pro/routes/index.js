var express = require('express');
var router = express.Router();
var usrDAO=require('../dao/userDAO');
var filter=require('../util/filter');

/* GET home page. */
router.get('/', function(req, res) {
    req.session.url='/';
    res.render('index', { title: 'express',author:'lzhan' });
    var s=fs.readFile('index.css');
    res.render('index',s);
});
router.get('/login', function(req, res) {
        res.render('login',{author:'lzhan'});
    })
    .post('/login', function(req, res) {
        console.log(req.body);
        usrDAO.login(req.body,function (result) {
          var r=result[0].num;
          if(r==0){
            res.json({result:0});
          }else {
              req.session.userID=req.body.email;
              if(req.session.url==undefined){
                  console.log('login>>>'+req.session.url);
                  res.json({result:1,url:'/'});

              }else {
                  console.log('login>>>'+req.session.url);
                  res.json({result:1,url:req.session.url});
              }
          }
        })
});

router.get('/success', function(req, res) {
    if(req.session.userID==undefined){
        res.redirect('/login');
    }else {
        res.render('success');
    }

});

router.get('/cart', function(req, res) {
   filter.filt(req,res,'cart');
});
router.get('/menu', function(req, res) {
    filter.filt(req,res,'menu');

});
router.get('/test', function(req, res) {
    res.render('test',{title:'test',data:[1,20,30,40]});

});
router.get('/list', function(req, res) {
    res.render('list',{title:'内容列表'});

});

router.get('/common/head_angular', function(req, res) {
    res.render('common/head_angular');

});

module.exports = router;
