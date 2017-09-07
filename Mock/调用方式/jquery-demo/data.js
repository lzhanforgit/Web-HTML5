/**
 * Created by lzhan on 2017/8/11.
 */


// 学习网站：https://github.com/nuysoft/Mock/wiki


var Random = Mock.Random;
Random.extend({
    constellation: function() {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    },

    authornames: function() {
        var name = ['张伟', '李丽','王东','张忠','司马光'];
        return this.pick(name)
    }
});
Random.constellation();
Random.authornames();

Mock.mock('@constellation');
Mock.mock('@authornames');

Mock.mock('http://g.cn', {
    'name'     : '@name',
    'age|1-100': 1,
    'color'    : '@color',
    'number3|123.3': 1
});

Mock.mock('http://books.cn', {
        "books|10": [
            {
                // "id|1-10": 1,
                // "id":'book_@id',
                "id": 'book_' + '@integer(1, 100)',
                "name": "@cword(4)",
                // "author": Random.cname(),
                "author": '@authornames',
                "price|1-100.2": 1,
                "publish_date": Random.date('yyyy-MM-dd'),
                'email': '@email',
                "comments_acount|10000-100000": 1,
                "sall_type|1-10": 1,
                "icon": "book01.jpg",
                "star": '@constellation',
                "count|1-100": 1,
                "isSelected": Random.boolean(2, 8, true), //指示参数 current 的相反值 !current 出现的概率。概率计算公式为 max / (min + max)。该参数的默认值为 1，即有 50% 的概率返回参数 !current。
                "comments": "@cparagraph(2, 7)"
            }
        ]
    }

);