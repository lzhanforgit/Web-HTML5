/**
 * Created by lzhan on 2017/8/13.
 */

$(function () {
    getData(show);

})


function getData(callback){
    $.ajax({
        url:'js/books.json',
        dataType:'json',
        type:'get',
        success:function (result) {
            console.log(result);
            callback(result);
        }
    })
}

function show(data) {
    var ul=$('.main ul')[0];
    for(var i=0,len=data.length;i<len;i++){
        ul.innerHTML+=`<li>
                   <div class="img-css">
    
                   </div>
    
                   <div class="book-price">
                       ${data[i].price}
                   </div>
                 </li>`
    }
}
