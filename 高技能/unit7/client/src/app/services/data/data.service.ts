/**
 * Created by lzhan on 2017/8/27.
 */
import Mock from 'mockjs';

var Random = Mock.Random;
export var brand=['盖璞','花花公子','七匹狼','森马','美特斯邦威','战地吉普','海澜之家'];
export var nav=[
  {
    linkText:'首页',
    linkHref:'index'
  },
  {
    linkText:'搜索',
    linkHref:'goods'
  },
  {
    linkText:'登录',
    linkHref:'login'
  },
  {
    linkText:'个人中心',
    linkHref:'personal-center'
  }

];
Random.extend({
  constellation: function() {
    var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations)
  },
  brands: function() {
    var name = brand;
    return this.pick(name)
  },
  authornames: function() {
    var name = ['张伟', '李丽','王东','张忠','司马光'];
    return this.pick(name)
  }
});
Random.constellation();
Random.authornames();
Random.brands();

Mock.mock('@constellation');
Mock.mock('@authornames');
export let data=Mock.mock({
    "goods|10-100": [
      {
        "id": 'goods_' + '@integer(1, 100)',
        "name": "@cword(6)",
        "brand":"@brands",
        "price|1-100.2": 1,
        "publish_date": Random.date('yyyy-MM-dd'),
        "comments_acount|10000-100000": 1,
        "sall_type|1-10": 1,
        "icon": "t-shirt.jpg",
        "count|1-1000": 1,
        "introduce": "@cparagraph(2, 7)"
      }
    ]
  }

);

