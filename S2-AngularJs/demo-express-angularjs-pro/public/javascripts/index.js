/**
 * Created by lzhan on 16/9/5.
 */
$(function () {
    $('#login_form').submit(function () {
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $('#login_form').serialize(),
            dataType:'json',
            success: function (data) {
                if(data.result==0){
                    alert('用户名或密码错误');
                }else {
                    location.href=data.url;
                }
            },
            error: function (error) {
                alert('error!!!!');

            }

        });
        return false;
    })
})