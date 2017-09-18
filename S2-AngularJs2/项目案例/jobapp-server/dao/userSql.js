/**
 * Created by lzhan on 2017/8/25.
 */
exports.sql={
    getPasswordById:'select password from user where telephone=?',
    addUser:'insert into user(telephone,password,email,city_id) values(?,?,?,?)',
    createToken:'update user set token=? where telephone=?',
    getUserIcon:'select user_icon.icon from user inner join user_icon ON user.id=user_icon.user_id where user.telephone=? order by upload_date desc ',
    addUserIcon:'call addUserIcon(?,?,@res)'
};