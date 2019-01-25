/**
 * Created by lzhan on 2018/3/20.
 */

var booksAll=[
    {
        id:'001',
        name:'浮生六计',
        author:'汪涵',
        price:22.8,
        comments:223000,
        sall_type:0,
        icon:'book01.jpg'
    },
    {
        id:'002',
        name:'三国演义',
        author:'罗贯中',
        price:1.0,
        comments:122300,
        sall_type:1,
        icon:'book01.jpg'
    },
    {
        id:'008',
        name:'西游记',
        author:'吴承恩',
        price:122.8,
        comments:823000,
        sall_type:0,
        icon:'book01.jpg'
    },
    {
        id:'006',
        name:'水浒传',
        author:'施耐庵2号',
        price:222.8,
        comments:245000,
        sall_type:1,
        icon:'book01.jpg'
    },
    {
        id:'004',
        name:'在水一方',
        author:'施耐庵',
        price:222.8,
        comments:245000,
        sall_type:0,
        icon:'book01.jpg'
    },
    {
        id:'0011',
        name:'红楼梦',
        author:'曹雪芹',
        price:52.8,
        comments:223000,
        sall_type:1,
        icon:'book01.jpg'
    }
];

var goods_container=document.querySelector('#goods_container');

//是全选复选按钮
var chk_all=document.querySelector('#chk_all');

for(var i=0,len=booksAll.length;i<len;i++){
    goods_container.innerHTML+=`

            <tr id="${booksAll[i].id}">
               <td>
                   <input type="checkbox" id="chk_${booksAll[i].id}" onclick="chkClick(this)">
               </td>
               <td>
                   <div class="icon">
                       <div><img src="images/book01.jpg" alt=""></div>
                       <div>
                           <p>${booksAll[i].name}</p>
                       </div>
                       <div>
                           <p>颜色：金色</p>
                           <p>尺码：公开版</p>
                       </div>
                   </div>
               </td>
               <td>￥${booksAll[i].price}</td>
               <td>
                   <input type="button" class="btn" value="-" onclick="subOne(this)">
                   <input type="text" value="1" class="txt_num">
                   <input type="button" class="btn" value="+" onclick="addOne(this)">
               </td>
               <td>￥${booksAll[i].price.toFixed(2)}</td>
               <td>删除</td>
           </tr>

        `
}

function showDetail(t) {
    alert(t.id);
}

//-------------全选------------
function checkAll() {

    var chks=document.querySelectorAll('#goods_container [id^="chk_"]');
    if(this.checked){
        for(var j=0,len=chks.length;j<len;j++){
            chks[j].checked=true;

        }
    }else {
        for(var j=0,len=chks.length;j<len;j++){
            chks[j].checked=false;

        }
    }

    zongji();
}


function chkClick(that) {
    if(!that.checked){
        chk_all.checked=false;
    }else {
        var chks=document.querySelectorAll('#goods_container [id^="chk_"]');
        for(var j=0,len=chks.length;j<len;j++){
           if(!chks[j].checked){
               break;
           }
        }

        if(j==chks.length){
            chk_all.checked=true;
        }

    }

    zongji();
}
chk_all.onclick=checkAll;


//-------------------小计------------------

function subOne(that) {
   if(that.nextElementSibling.value>0){
       var input=that.nextElementSibling;
       input.value--;
       var price=that.parentNode.previousElementSibling.innerText.substring(1)
        xiaoji(parseFloat(input.value),parseFloat(price),that.parentNode.nextElementSibling)
   }

   zongji();

}

function addOne(that) {
    var input=that.previousElementSibling;
        input.value++;
        var price=that.parentNode.previousElementSibling.innerText.substring(1)
    xiaoji(parseFloat(input.value),parseFloat(price),that.parentNode.nextElementSibling)
    zongji();
}

function xiaoji(count,price,dom) {

    var jx=(count*price).toFixed(2);

    dom.innerText='￥'+jx;
    
}

//-------------------总计------------------

var total_price=document.querySelector('#total_price');

function zongji() {
    var sub=0;
    var chks=document.querySelectorAll('#goods_container [id^="chk_"]');
    for(var j=0,len=chks.length;j<len;j++){
        if(chks[j].checked){
            var xiaoji=chks[j].parentNode.parentNode.children[4].innerText.substring(1);
            console.log(xiaoji);
            sub+=parseFloat(xiaoji)
        }

    }

    total_price.innerText='￥'+sub.toFixed(2);
}

zongji();

