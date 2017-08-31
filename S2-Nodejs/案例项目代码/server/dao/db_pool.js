/**
 * Created by lzhan on 2017/8/28.
 */
var mysql=require('mysql');
var dbconfig=require('../dbconfig');
var pool=mysql.createPool(dbconfig.options);
pool.connectionLimit=20;
pool.queueLimit=30;
exports.pool=pool;
