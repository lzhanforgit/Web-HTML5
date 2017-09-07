/**
 * Created by lzhan on 2017/8/8.
 */
var Mock = require('mockjs');
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});

console.log(JSON.stringify(data, null, 4))