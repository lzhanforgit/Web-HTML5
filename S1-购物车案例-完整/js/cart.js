/**
 * Created by lzhan on 2017/3/23.
 */
window.onload=function () {
    //页面刷新时
    ajaxGet('../data/data.json',function (books) {
        if(window.localStorage.getItem('cartBooks')===null){
            //更新本地数据
           upadateCart(books);

        }
    });
//    显示购物车
    showCart();
    calculateTotalPrice();

//    为每行添加点击事件，准备冒泡
    var trs=document.querySelectorAll('#table-cart tr');
    for(var index in trs){
        trs[index].onclick=rowClick;
    }
    function rowClick(ev) {
        var bookId=this.getAttribute('id');
        if(ev.target.nodeName.toLowerCase()==='button'){
            var txt=this.querySelector('input[type="text"]');
            //1. 改变商品数量
            if(ev.target.innerText.trim()==='+'){
                txt.value++;
            }else if(ev.target.innerText.trim()==='-'){
                if(txt.value>1){
                    txt.value--;
                }
            }

            // 2. 勾选复选框
            this.querySelector('input[type="checkbox"]').checked=true;

            // 3. 更新数据
            var books=JSON.parse(localStorage.getItem('cartBooks'));
            for(var index in books){
                if(books[index].id===bookId){
                    books[index].isSelected=true;
                    books[index].count=txt.value;

                }
            }
            upadateCart(books);

            // 4. 更新小计
            var price=0;
            for(var index in books){
                if(books[index].id===bookId){
                    price=books[index].price;
                }
            }
            this.cells[4].innerText=(parseInt(txt.value)*price).toFixed(2);
            // this.querySelectorAll('td')[4]

            // 5. 统计总价
            calculateTotalPrice()
        } // end  ev.target.nodeName.toLowerCase()==='button'
        else if(ev.target.getAttribute('type')=='checkbox'){

            var val=ev.target.checked;
            var books=JSON.parse(localStorage.getItem('cartBooks'));
            for(var index in books){
                if(books[index].id===bookId){
                   books[index].isSelected=val;

                }
            }
            upadateCart(books);
            calculateTotalPrice();
        }
    }


};

//更新localStorage 中的所有图书信息
function upadateCart(books) {
    if(typeof books ==='object'){
        books=JSON.stringify(books);
    }
    window.localStorage.setItem('cartBooks',books);
}

//页面显示图书函数
function showCart() {
    // 从本地取出数据
    var books=JSON.parse(localStorage.getItem('cartBooks'));


    var str_view='';
    for(i in books){
        //此处：根据数据中 isSelected 的值为 true 或者 false ， 判断复选框是否是选中状态
        var chk=books[i].isSelected ? '<input type="checkbox" checked>':'<input type="checkbox">';
        //为每一行添加一个id 该id就是书籍的id值
        str_view+='<tr id="'+books[i].id+'">'+
            '<td>' +
            chk +
            '</td>'+
            '<td>' +
            '' +
                '<img src="images/book01.jpg" height="70px">' +

                 books[i].name +
                '作者：'+books[i].author +

            '</td>'+
            '<td>' +
                '￥ ' +books[i].price+
            '</td>'+
            '<td class="col-md-1 col-lg-1">' +
                '' +
                //此处使用Bootstrap 组件
                '<div class="input-group">'+
                '<span class="input-group-btn">'+
                '<button class="btn btn-default" type="button">-</button>'+
                '</span>'+
                '<input type="text" value="'+books[i].count+'"   style="width: 50px;text-align: center" class="form-control">'+
                '<span class="input-group-btn">'+
                '<button class="btn btn-default" type="button">+</button>'+
                '</span>'+
                '</div><!-- /input-group -->' +
                '' +
                '' +
            '</td>'+
            '<td>' +
            (books[i].price*books[i].count).toFixed(2) +
            '</td>'+
            '<td>操作</td>'+
            '</tr>'
    }
    document.querySelector('#table-cart').innerHTML+=str_view;
}

//计算总价

function calculateTotalPrice() {
    var books=JSON.parse(localStorage.getItem('cartBooks'));
    var total=0;
    for(var i in books){
        if(books[i].isSelected===true){
            total+=(parseFloat(books[i].price)*parseInt(books[i].count));
        }
    }

    document.querySelector('#totalPrice').innerText=total.toFixed(2);
}