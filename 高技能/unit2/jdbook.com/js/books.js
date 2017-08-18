/**
 * Created by lzhan on 2017/8/13.
 */
window.onload=function () {
    Util.prototype.ajax('datas/bookShopType.json','GET',showBookShopType);
    Util.prototype.ajax('datas/articleType.json','GET',showArticleType);
    Util.prototype.ajax('datas/books.json','GET',showBooks);

    var shop_ul=document.querySelector('#shopType');
    shop_ul.onclick=function (event) {
        var that=event.target;
        var li_all=shop_ul.children;
        for(let i=0,len=li_all.length;i<len;i++){
            alert(li_all[i].innerText);
            li_all[i].className='blue'
        }
        that.className='red';
    }
    var article_type_ul=document.querySelector('#articleType');

    article_type_ul.onclick=function (event) {
        alert(event.target.dataset.articleTypeId);
    }
}

function showBookShopType(data){
    data=JSON.parse(data);
    var ul=document.querySelector('#shopType');
    for(var v of data){
        ul.innerHTML+=`
             <li>
                 <a href="####" data-shop-id="${v.id}">
                       ${v.name}
                 </a>
             </li>
        `
    }
}

function showArticleType(data){
    data=JSON.parse(data);
    var ul=document.querySelector('#articleType');
    for(var v of data){
        ul.innerHTML+=`
             <li>
                 <a href="####" data-article-type-id="${v.id}">
                       ${v.name}
                 </a>
             </li>
        `
    }
}

function showBooks(data) {

}