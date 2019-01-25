/**
 * Created by lzhan on 16/8/30.
 */

var dbconfig=require('../dbconfig');
var mysql=require('mysql');
function getConnection(callback) {
    var connect_pool=mysql.createPool(dbconfig.options);
    connect_pool.connectionLimit=20;
    connect_pool.queueLimit=10;
    connect_pool.getConnection(function (error,client) {
        if(error){
            console.log(error.message);
            setTimeout(getConnection,2000);
        }
        callback(client);
    });

}

exports.getConnection=getConnection;