/**
 * Created by lzhan on 16/8/23.
 */
function createFileName() {
    var date=new Date();
    var ran=Math.random();
    var datea=new Date('1970-1-1')
    var _name=ran.toString()+(date-datea);
    return _name;
}
exports.creatName=createFileName;