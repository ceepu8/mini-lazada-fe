import { currencyFormat } from "../../../../utils/index.js";

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartListElement = document.querySelector(".cart-list");

  console.log(cart);
  const html = cart
    .map((each) => {
      const { price, name, quantity, image } = each;
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
        <div class="remove-button">
          <button class="btn primary-button">Remove</button>
        </div>
      </div>
    `;
    })
    .join("");

  console.log(html);

  cartListElement.innerHTML = html;
};

window.onload = () => {
  renderCart();
};
