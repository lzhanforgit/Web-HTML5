/**
 * Created by lzhan on 2017/9/13.
 */


// https://cnodejs.org/topic/53c652bfc9507b404446ee40

// http://momentjs.com/docs/#/get-set/
var jwt=require('jwt-simple');
var moment = require('moment');

//生成token
// var expires = moment().add(7, 'days').valueOf();
// var token = jwt.encode({
//     iss: '13812790421',
//     exp: expires
// }, 'com.jobapp');
//
// console.log(token);

var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMzgxMjc5MDQyMSIsImV4cCI6MTUwNjMwMjY5MTU3Mn0.r5ba2-y2L7Zn4z7rvmSII5gzgpzJNSVIZln-61LgzLY'
//解析token
var decoded = jwt.decode(token, 'jobapp');

console.log(decoded);


//服务器端获取token

// var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];


// if (token) {
//     try {
//         var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
//
//         // handle token here
//
//     } catch (err) {
//         return next();
//     }
// } else {
//     next();
// }

