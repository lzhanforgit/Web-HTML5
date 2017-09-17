var express = require('express');
var router = express.Router();
var util = require('./../utils/util');
var formidable=require('formidable');
var AVATAR_UPLOAD_FOLDER='/uploads/';
var fs=require('fs');


//产生令牌
var jwt=require('jwt-simple');
var moment = require('moment');

var userdao = require('./../dao/userDAO').userDao;
router.get('/login', function (req, res, next) {
    var user = req.query;
    console.log('here');
    console.log(user);
    res.json({"stateCode": 3});
});
router.post('/login', function (req, res, next) {
    var user = req.body;
    console.log(user);
    if (user) {

        userdao.getPasswordById(user.telephone, function (result) {
            if (result == 'e004') {
                res.json({"stateCode": result});
            } else {
                if (result.length == 0) {
                    res.json({"stateCode": 3});
                } else {
                    if (result[0].password == util.MD5(user.password)) {

                        //产生令牌


                        res.json({"stateCode": 1});

                    } else {
                        res.json({"stateCode": 2});
                    }
                }
            }
        })
    }
});
router.post('/upload', function (request, response, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';
    form.parse(request, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            response.json({"stateCode":'e005'});
            return;
        }
        console.log(fields);
        var extName = '';  //后缀名
        switch (files.user_icon.type) {
            case 'image/jpeg':
                extName = 'jpeg';
                break;
            case 'image/jpg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if(extName.length == 0){
            response.json({"stateCode":'e005'});
            return;
        } else{
            form.uploadDir = "../public"+AVATAR_UPLOAD_FOLDER;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            var avatarName = util.createUnique() + '.' + extName;
            // 'public/uploads/d23242343242.jpg'
            var newPath = form.uploadDir + avatarName;
            // console.log("newpath---"+newPath);
            // fs.renameSync(files.user_icon.path, newPath);  //重命名
            fs.rename(files.user_icon.path, newPath,function (error) {
                if(error){
                    response.json({"stateCode":'e005'});
                    return
                }
                userdao.addUserIcon(fields.userId,avatarName,function (result) {
                    if(result==1){
                        response.json({"stateCode":1});
                    }else{
                        response.json({"stateCode":0});
                    }
                })
            })

        }

    })



});
router.post('/adduser', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getUserIcon', function (req, res, next) {
    var user_telephone=req.body.telephone;
    userdao.getUserIcon(user_telephone,function (result) {
        if(result.length==0){
            res.json({"icon":"icon_default.jpg"});
        }else {
            res.json({"icon":result[0].icon});
        }
    })
});

module.exports = router;
