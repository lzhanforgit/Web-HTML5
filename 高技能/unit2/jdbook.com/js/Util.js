/**
 * Created by lzhan on 2017/8/13.
 */
function Util() {

}

Util.prototype.ajax=function(url,type='GET',callback) {
    var ajax=new XMLHttpRequest();
    ajax.open(type,url,true);
    ajax.timeout=3000;
    ajax.send(null);
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status==304){
                callback(ajax.responseText);
            }else{
                callback(null);
            }
        }
    };

};

Util.prototype.MD5=function () {

}


