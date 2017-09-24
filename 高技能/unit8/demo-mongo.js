/**
 * Created by lzhan on 2017/9/24.
 */
var mongoDb=require('mongodb');
var  serverConfig  = new mongoDb.Server('localhost', 27017, {auto_reconnect:true});


var  client = new mongoDb.Db('zhaopin', serverConfig, {safe:true});


client.open(function (error,database) {
    if(error){
        console.log(error.message);
        return;
    }
    database.createCollection('users', {safe:true}, function(err, collection){
        if(err){
            console.log(error.message);
            return;
        }

        collection.find({age:{$gt:40}}).toArray(function (error,docs) {
            console.log(docs);
        })
    })
})