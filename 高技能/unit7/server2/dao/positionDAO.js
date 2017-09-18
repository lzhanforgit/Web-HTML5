var pool=require('./db_pool').pool;
var positionSql=require('./positionSql').sql;
exports.positionDao={
    getAllPositions:function (callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(positionSql.getAllPositions,function (error,result) {
                if(error){
                    callback('e004');
                    return;
                }

                callback(result);
                client.release();
            })
        })
    }
}


