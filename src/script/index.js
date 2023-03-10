import '../index.html';
import '../css/style.css';

"use strict";


                                        //Basket block
//массив товаров в карзине
let basketGoods = [];


//открытие карзины
document.getElementById('basket-btn').addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "block";
});


//счетик длинны корзины
function lenthBasket(){
    if(basketGoods.length > 0){

        document.getElementById('basket-col').innerHTML = basketGoods.length;

    }

};


//закрытие корзины вне контейнера
document.onclick = (event) => {
    if(event.target.classList == "background-color-container"){
        document.querySelector(".background-color-container").style.display = "none";
    }
};

//закрытие контенера на X
document.querySelector(".close-basket").addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "none";
});


//формирование блока
function blockbasket(){
    document.querySelector(".container-item-goods").innerHTML = "";
    if(basketGoods.length > 0){
        basketGoods.forEach((item, ind) => {
            let blockGoods = `
                            <div class="users-goods-basket" id="${item.id}">
                                <div class="users-goods-basket_foto">
                                    <img src=${item.url} alt="" class="users-goods-basket_img">
                                </div>
                                <div class="users-goods-basket_title">
                                    <span>${item.title}</span>
                                </div>
                                <div class="users-goods-basket_col">
                                    <div class="components-col">
                                        <button id="minus-btn">-</button>
                                        <span id="col-goods">${item.col}</span>
                                        <button id="plus-btn">+</button>
                                    </div>    
                                    <span class="delete-item-basket">Удалить</span>
                                </div>
                                <div class="users-goods-basket_sum">
                                    <span class="sum-withdiscount"><span id="withdiscount-sum-basket">${item.col * (Number(item.price) * (1 - Number(item.percent) / 100))}</span> руб</span>
                                    <span class="sum-nodiscount"><span id="nodiscount-sum-basket">${item.price * item.col}</span> руб</span>
                                </div>
                            </div>   
            `;
            document.querySelector(".container-item-goods").innerHTML += blockGoods;
        });
    };
    lenthBasket();
    sumPriceInBasket();
};

//тестовая основная функция -- когда будут карточки брать из основного Массива Объектов
let goods = [{
    url: "./1.jpg",
    id: 1,
    title: "Робот-пылесос PVCR 0726W (POLARIS), Polaris",
    price: 500,
    percent: 15,
}];

//функция конструктор
function GoodsInBasket(goods){
    this.url = goods.url; //ссылка на фото
    this.id = goods.id + basketGoods.length; //айди
    this.title = goods.title; //название карточки
    this.col = 1; //количество едениц
    this.price = Number(goods.price); //цена со скидкой
    this.percent = goods.percent; // цена без скидки
};


//перенос в корзину
document.getElementById('sendInbasket').addEventListener("click", () => {
    basketGoods.push(new GoodsInBasket(goods[0]));
    lenthBasket();
    blockbasket();
    sumPriceInBasket();
});


//добаление количества, сокращение кол-ва, удаление позиции
document.querySelector('.container-item-goods').onclick = function(e){
    let targetClick = e.target;
    let parentid = targetClick.closest('.users-goods-basket').id;
    if(targetClick.id == "plus-btn"){
        basketGoods.forEach(item => {
            if(item.id == parentid){
                item.col += 1;
            };
        });
    };
    if(targetClick.id == "minus-btn"){
        basketGoods.forEach((item,ind) => {
            if(item.id == parentid){
                item.col -= 1;
                if(item.col <= 0){
                    basketGoods.splice(ind, 1);
                } else{
                    item.col -= 1;
                }
            };
        });
    };
    if(targetClick.className == "delete-item-basket"){
        basketGoods.forEach((item, ind) => {
            if(item.id == parentid){
                basketGoods.splice(ind, 1);
            };
        });
    };
    blockbasket();
}


//сумирование итогов со скидкой
function sumPriceInBasket(){
    let sum = 0;
    let sumNoDiscont = 0;
    let colSum = 0;
    basketGoods.forEach(item => {
        sum += (item.col * (Number(item.price) * (1 - Number(item.percent) / 100)));
        sumNoDiscont += (item.col * Number(item.price));
        colSum += Number(item.col);
    })

    document.getElementById('sum-basket').innerHTML = sum;
    document.getElementById('sum-basket-nodicount').innerHTML = sumNoDiscont;
    document.getElementById('sum-basket-discount').innerHTML = sumNoDiscont - sum;
    document.getElementById('sum-basket-col').innerHTML = colSum;
};


//подтверждение заказов *пока что очищаем массив в корзине потом придумаем куда отпралять
document.getElementById('order-btn').addEventListener("click", () => {

    if(document.querySelector('input[type=checkbox]').checked) {
        basketGoods.length = 0;
    } else {
        alert("Ознакомьтесь с правилами")
    };
    blockbasket();
});


                                    //btn up page
window.addEventListener('scroll', function() {
    if(pageYOffset > 20) {
    document.querySelector('.btn-quick-nav').style.display = "block";
    }
    if(pageYOffset < 20){
        document.querySelector('.btn-quick-nav').style.display = "none";
    }
});

document.querySelector('.btn-quick-nav').addEventListener('click', () => {
    window.scrollTo(pageYOffset, 0);
});