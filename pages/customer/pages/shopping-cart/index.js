import { currencyFormat } from "../../../../utils/index.js";

const calculateTotalPrice = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, each) => each.quantity * each.price,
    0
  );
  console.log(totalPrice);

  document.querySelector(".total-price").innerHTML = `
    <div>Total: <span class="price-value">${currencyFormat(
      totalPrice
    )}</span></div>
  
  `;
};

window.adjustCartProductQuantity = (id, isIncreasing) => {
  const quantity = document.querySelector(".quantity-adjust .quantity-input");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newCart = [...cart];

  const productIndex = cart.findIndex((prod) => prod.productID === id);

  if (isIncreasing) {
    cart[productIndex].quantity += 1;
  } else {
    cart[productIndex].quantity -= 1;
  }

  if (cart[productIndex].quantity === 0) {
    newCart.splice(productIndex, 1);
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCart();
};

window.removeCartProduct = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newCart = [...cart];

  const productIndex = cart.findIndex((prod) => prod.productID === id);
  newCart.splice(productIndex, 1);

  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCart();
};

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartListElement = document.querySelector(".cart-list");
  let html = "";

  if (!cart.length) {
    html = "<p class='text-center'>Your cart is empty. Please add items.</p>";
    cartListElement.innerHTML = html;
    calculateTotalPrice();
    return;
  }

  html = cart
    .map((each) => {
      const { productID, price, name, quantity, image } = each;
      return `
      <div class="cart-item d-flex align-items-center justify-content-between">
        <div class="product-image">
          <img src=${image} alt="cart-image"/>
        </div>
        <div class="product-infor">
          <div class="item-name">${name}</div>
          <div class="item-price">${currencyFormat(price)}</div>
          <div class="item-quantity">x${quantity}</div>
        </div>
        <div class="quantity-adjust">
        <button class="btn secondary-btn icon-button minus-btn" onclick="adjustCartProductQuantity('${productID}', false)"><i class="fa-solid fa-minus"></i></button>
        <input class="quantity-input" value='${quantity}'/>
        <button class="btn secondary-btn icon-button plus-btn" onclick="adjustCartProductQuantity('${productID}', true)"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="remove-button">
          <button class="btn primary-btn" onclick="removeCartProduct('${productID}')">Remove</button>
        </div>
      </div>
    `;
    })
    .join("");

  cartListElement.innerHTML = html;
  calculateTotalPrice();
};

window.onload = () => {
  renderCart();
};
