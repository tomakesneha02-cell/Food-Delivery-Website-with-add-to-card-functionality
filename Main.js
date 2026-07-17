// const { response } = require("express");

 var swiper = new Swiper(".mySwiper", {
      loop: true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
});
// const cartIcon = document.querySelector('.cart-icon');
// const cartTab = document.querySelector('.cart-tab');
// cartIcon.addEventListener('click', ()=> cartTab.classList.add(cart-tab-active));
const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn= document.querySelector('.close-btn');
const  cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const  cartValue = document.querySelector('.cart-value');
const hamburger =  document.querySelector('.hamburgers');
const mobileMenu = document.querySelector('.Mobile-menu');


cartIcon.addEventListener('click', () => {
    cartTab.classList.add('cart-tab-active');
});

// "If the cart icon is clicked, show the cart."


closeBtn.addEventListener('click', ()=> cartTab.classList.remove('cart-tab-active'));
hamburger.addEventListener('click', ()=> Mobile-menu.class.toggle('mobile-menu-active'));



let productList = [];
let cartproduct=[];
const  updateTotals = () =>{
  let totalPrice=0;
  let totalQuantity =0;

  document.querySelectorAll('.item').forEach(item =>{
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
    
    totalPrice += price;
    totalQuantity += quantity;
  });
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent=totalQuantity;
}

const showCards = () =>{
    productList.forEach(product => {
      const orderCard = document.createElement('div');
      orderCard.classList.add('order-card');
      orderCard.innerHTML = `
      <div class="card-image">
          <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn cart-btn">Add to Card</a>
      `;
      cardList.appendChild(orderCard)

      const cartBtn = orderCard.querySelector('.cart-btn');
      cartBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        addToCart(product)

      });
    });
};

const addToCart = (product) =>{

 const existingProduct = cartproduct.find(item => item.id === product.id);
 if(existingProduct){
    alert('Item already in your cart!');
    return;
 }
 cartproduct.push(product);
 let quantity=1;
 let price = parseFloat(product.price.replace('$',''));

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');
  cartItem.innerHTML=`
  <div class="item-image">
    <img src="${product.image}">
  </div>
  <div class="detail">
    <h4>${product.name}</h4>
    <h4 class="item-total">${product.price}</h4>
  </div>
  <div class="flex ">
    <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
    <i class="fa-solid fa-plus"></i>
    </a>
  </div>
  `;
  cartList.appendChild(cartItem);
  updateTotals();

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus')


plusBtn.addEventListener('click', (e) => {
    e.preventDefault();

    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
});
minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(quantity > 1){
      quantity--;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
    }
    else{
      cartItem.classList.add('slide-out');
      setTimeout(()=>{
      cartItem.remove();
      cartproduct= cartproduct.filter(item =>item.id !== product.id);
      updateTotals();

      },300)
    }
    

});


};


const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productList = data;
            showCards();
        })
        .catch(error => {
            console.log("Error:", error);
        });
};

initApp();