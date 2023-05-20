import { customerApi } from "../../../../controller/apis/customerApi.js";
import { shipperApi } from "../../../../controller/apis/shipperApi.js";
import { renderHeaderUserAuth } from "../../../../controller/main.js";
import { currencyFormat } from "../../../../utils/index.js";

window.handlePlaceOrder = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  const products = cart.map((each) => ({
    productID: each.productID,
    quantity: each.quantity,
  }));

  const totalPrice = cart.reduce(
    (total, each) => (total += each.quantity * each.price),
    0
  );

  const selectHubElement = document.querySelector("select#hub");
  const hub = selectHubElement.value;

  const order = { products, hub, totalPrice };
  try {
    const { data, status } = await customerApi.createOrder(accessToken, order);

    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      }).then(() => {
        window.location = "/pages/customer/pages/profile/index.html";
      });
      localStorage.removeItem("cart");
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
};

const renderCartProducts = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const orderProductElement = document.querySelector(".order-products");
  const totalPriceElement = document.querySelector(".order-total");

  const totalPrice = cart.reduce(
    (total, each) => (total += each.quantity * each.price),
    0
  );

  const html = cart
    .map((each) => {
      const { productID, quantity, name, price } = each;

      const prodTotalPrice = quantity * price;
      return `
        <div class="order-col dele1">
          <div class="name">${quantity}x ${name}</div>
          <div class="price">${currencyFormat(prodTotalPrice)}</div>
        </div>
    `;
    })
    .join("");

  orderProductElement.innerHTML = html;
  totalPriceElement.innerHTML = currencyFormat(totalPrice);
};

const renderUserInfo = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  const form = document.getElementById("billing-form");
  const inputs = form.querySelectorAll("input");

  for (let input of inputs) {
    const inputId = input.id;
    console.log(inputId);
    input.value = user[inputId];
  }
};

const renderHubSelectOptions = async () => {
  try {
    const { data } = await shipperApi.getHubs();
    const html = data?.data.reduce((result, hub) => {
      const { name, _id: id, address } = hub;
      return result + `<option value="${id}">${name}</option>`;
    }, "");

    const select = document.querySelector("select#hub");
    select.innerHTML = html;
  } catch (error) {}
};

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!user || (!cart && !cart?.length)) {
    window.location = "/index.html";
  }

  renderUserInfo();
  renderCartProducts();
  renderHubSelectOptions();
  renderHeaderUserAuth();
};
