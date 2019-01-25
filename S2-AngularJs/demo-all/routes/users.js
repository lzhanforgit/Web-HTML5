var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');
var formidable = require('formidable');
var util=require('util');
var AVATAR_UPLOAD_FOLDER='/upload/';
var createUnique=require('../util/createUnique');
var fs=require('fs');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/regist', function (req, res, next) {
    res.render('regist');

});
router.post('/regist', function (req, res, next) {
    /*console.log(req.body);

     userDAO.getUserById(req.body.email,function (result) {
     if(parseInt(result[0].num)==0){
     //用户已经存在
     userDAO.regist(req.body,function (_result) {
     console.log(_result);
     if(_result.affectedRows==1){
     //注册成功
     res.json({res:0});
     }else{
     //插入失败
     res.json({res:2});
     }
     })

     }else{
     res.json({res:1});
     }
     })*/

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            // response.render("uploads");
            return;
        }
        userDAO.getUserById(fields.email,function (rr) {
            if(rr[0].num==1){
                res.send('用户已存在');

            }else{
                console.log("fields>>>"+JSON.stringify(fields));
                // console.log("file------"+util.inspect(files));
                //     for(file in files){
                //         console.log("file>>>>>"+file);
                //     }



                var extName ='';  //后缀名
                console.log('files.in_file.type: '+files.fileImage01.type);
                switch (files.fileImage01.type) {  //此处in_file  为页面端 <input type=file name=in_file>
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
                    res.send('只支持png和jpg格式图片');
                    return;
                }else{
                    form.uploadDir = "../public"+AVATAR_UPLOAD_FOLDER;     //设置上传目录
                    form.keepExtensions = true;     //保留后缀
                    form.maxFieldsSize = 2 * 1024;   //文件大小
                    console.log('here');
                    var avatarName = createUnique.creatName() + '.' + extName;
                    var newPath = form.uploadDir + avatarName;
                    fs.renameSync(files.fileImage01.path, newPath);  //重命名
                    var user={};
                    user.email=fields.email;
                    user.password=fields.password;
                    user.user_icon=avatarName;
                    userDAO.regist(user,function (_result) {
                        if(_result.affectedRows==1){
                            res.send('uploads success');
                        }else {
                            res.send('uploads fail');
                        }

                        console.log("add img ---end");
                    })

                }


            }
        })


    });

})
    module.exports = router;
