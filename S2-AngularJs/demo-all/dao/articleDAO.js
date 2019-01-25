/**
 * Created by lzhan on 16/9/5.
 */

var DBPool=require('../util/DBHelper');
function getBooks(index,acount,callback) {

    DBPool.getConnection(function (client) {
//调用视图
        client.query('select count(*) total from article',function (error,totalAcount) {
            if(error){
                console.log(error.message);
                return;
            }
            client.query('select id,introduction, title,content,CONCAT_WS("-",year(date),month(date),day(date)) date,icon from article order by date asc limit ?,? ',[(index-1)*acount,acount],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                //[{total:12}]
                callback({total:totalAcount[0].total,res:result});
                client.release();

            });
        });

    });
}


exports.getBooks=getBooks;