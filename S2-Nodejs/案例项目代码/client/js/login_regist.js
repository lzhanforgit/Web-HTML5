/**
 * Created by lzhan on 2017/8/25.
 */
$(function () {
    var tel = $('#telephone');
    var pass = $('#password');
    var pass_confirm=$('#password_confirm');

    tel.blur(function () {
        checkTelephone();
    });
    tel.keypress(function (event) {
       if( event.keyCode==13){
           checkTelephone();
           pass.focus();

       }
    });
    pass.blur(function () {
        checkPassword();
    });
    pass.keypress(function (event) {
        if( event.keyCode==13){
            checkPassword();
            $('#btn_login').focus();
        }
    });

    pass_confirm.blur(function () {
        checkPasswordConfirm();
    });
    pass_confirm.keypress(function (event) {
        if( event.keyCode==13){
            checkPasswordConfirm()
            $('#btn_regist').focus();
        }
    });


    $('#btn_login').click(function () {
        if(checkTelephone() && checkPassword()){
            $.ajax({
                type:'post',
                url:'http://localhost:3000/users/login',
                data:$('#login_form').serialize(),
                dataType:'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success:function (result) {
                    if(result.stateCode==1){
                        sessionStorage.setItem('userId',$('#telephone').val());
                        location.href='../index.html'
                    }else if(result.stateCode==2){
                        alert('用户名或密码错误')
                    }else if(result.stateCode==3){
                        alert('用户不存在');
                    }else{
                        location.href='./404.html';
                    }
                },
                error:function (err) {

                }
            })
        }
    });

    $('#btn_regist').click(function () {
        if(checkTelephone() && checkPassword() && checkPasswordConfirm()){
            $.ajax({
                url:'http://localhost:8080/user/regist',
                type:'post',
                data:$('#regist_form').serialize(),
                dataType:'text',
                success:function (state_code) {
                   if(state_code=='6'){
                       sessionStorage.setItem('userId',$('#telephone').val());
                       location.href='../index.html'
                   }else if(state_code==7){
                       alert('注册失败');
                   }else if(state_code=='5'){
                       alert('该用户已经存在')
                   }else {
                       location.href='./404.html';
                   }
                },
                error:function (err) {

                }
            })
        }
    })
});

function checkTelephone() {
    var tel = $('#telephone');
    var error_tel = $('#error_telephone');
    if (tel.val().trim()) {
        var reg = /^1(3|4|5|7|8)\d{9}$/;
        if (reg.test(tel.val())) {
            error_tel.html('');

            return true;
        } else {
            error_tel.html('号码格式不正确');
            return false;
        }
    } else {
        error_tel.html('号码不能为空');
        return false;
    }
}

function checkPassword() {
    var pass = $('#password');
    var error_pass = $('#error_password');
    if (pass.val().trim() && pass.val().trim().length >= 6) {
        error_pass.html('');

        return true;

    } else {
        error_pass.html('密码长度最小6位');
        return false;
    }

}

function checkPasswordConfirm() {
    if(checkPassword()){
        if($('#password').val().trim()==$('#password_confirm').val().trim()){
            $('#error_password_confirm').html('');
            return true;

        }else {
            $('#error_password_confirm').html('两次输入不一致');
        }
    }

}