/**
 * Created by lzhan on 2017/8/25.
 */
$(function () {

    //判断是否登录
    var user_id=window.sessionStorage.getItem('userId');
    var userBar=$('#user_bar');
    if(user_id){
        var str='<li><a href="./webs/personal.html">欢迎:'+user_id+'</a></li>';

        userBar.html(str);
    }else {
        var str='<li><a href="./webs/login.html">登录</a></li>'+
            '<li><a href="./webs/regist.html">注册</a></li>';
        userBar.html(str);
    }


    $.ajax({
        type:'get',
        url:'http://localhost:3000/positions',

        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success:function (result) {
           if(result){
               for(var i=0;i<result.length;i++){
                   $('#position_container').append(`
                        <div class="position_container">
                        <div class="position_left">
                            <div class="position_left_01">
                                ${result[i].name}
                            </div>
                            <div class="position_left_02">
                                <ul>
                                    <li>${result[i].salary}</li>
                                    <li>${result[i].city_name}</li>
                                    <li>${result[i].education}</li>
                                    <li>${result[i].years_working}</li>
                                </ul>
                            </div>
                            <div class="position_left_03">
                                4小时前 | 投递后：5天以内反馈
                            </div>
                        </div>
                        <div class="position_right"></div>
                    </div>
                    `)
               }
           }
        },
        error:function (err) {

        }
    })

});