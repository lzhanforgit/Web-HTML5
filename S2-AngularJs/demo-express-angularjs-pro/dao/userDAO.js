/**
 * Created by lzhan on 16/9/5.
 */

var DBPool=require('../util/DBHelper');
module.exports={
    login:function(user,callback) {
        DBPool.getConnection(function (client) {client.query('select count(*) num from user where email=? and password=?',[user.email,user.password],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result)
                client.release();

            });
        });
    },
    getUserById:function (id,callback) {
        DBPool.getConnection(function (client) {
            client.query('select count(*) num from user where email=?',[id],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log(JSON.stringify(result));
                //[{num:1}]
                callback(result)
                client.release();

            });
        });
    },
    regist:function (user,callback) {
        DBPool.getConnection(function (client) {
            client.query('insert into user(email,password,user_icon) values(?,?,?)',[user.email,user.password,user.user_icon],function (error,result) {
                if(error){
                    console.log(error.message);
                    callback({affectedRows:0});
                    return;
                }
                callback(result);
                client.release();

            });
        });
    }

};