import { shipperApi } from "../api/shipperApi.js";
import { currencyFormat } from "../utils/index.js";

window.goToDetailPage = (orderId) => {
  window.location.replace(`./order-detail.html?id=${orderId}`);
};

const renderOrderList = async () => {
  const loadingElement = document.querySelector(".order-loading");

  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  if (!accessToken) return;
  try {
    loadingElement.style.visibility = "visible";
    loadingElement.style.opacity = "1";
    loadingElement.style.minHeight = "calc(100vh - 240px)";

    const { data } = await shipperApi.getOrders(accessToken);

    if (!data.order.order.length) {
      document.querySelector(".order-list").innerHTML = `
        <h3>There is not any orders</h3>
      `;
      loadingElement.style.visibility = "hidden";
      loadingElement.style.opacity = "0";
      loadingElement.style.minHeight = 0;
      return;
    }

    const html = data?.order?.order.reduce((result, each) => {
      const { id, product, totalPrice, customer, status = "active" } = each;
      return (
        result +
        `   
             <div class="order-item">
                <div class="order-customer">
                  <div class="badge-group">
                  <span class="badge ${status}">${status}</span>
                  <span class="badge mall">Mall</span>
                  </div>
                  <h5>Order ID: ${id}</h5>
                  <div><span>Customer's Name:</span> ${customer.name}</div>
                  <div><span>Customer's Address:</span> ${
                    customer.address
                  }</div>
                </div>
                <div class="line-break"></div>
                <div class="order-products">
                    ${product
                      .map((each) => {
                        const { name, quantity, image, price } = each;
                        return `
                            <div class="product-infor">
                                <div class="product-other-infor">
                                  <div class="product-image">
                                    <img src='${image}' alt="product-image"/>
                                  </div>
                                  <div class="product-quantity">
                                    <p class="name">${name}</p>
                                    <span>x${quantity}</span>
                                    <div class="return-badge">7 ngày trả hàng</div>
                                  </div>
                                </div>
                                <div class="product-price">
                                  <span>${currencyFormat(price)}</span>
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
                <div class="line-break"></div>
                <div class="order-price">
                   <span>
                    Total:
                    <span class="total-price">${currencyFormat(
                      totalPrice
                    )}</span>
                    </span>
                    <div class="button-group">
                      <button class="btn secondary-button">Cancel</button>
                      <button class="btn primary-button" onclick="goToDetailPage('${id}')">View detail</button>
                    </div>
                </div>
              </div>
        `
      );
    }, "");
    loadingElement.style.visibility = "hidden";
    loadingElement.style.opacity = "0";
    loadingElement.style.minHeight = 0;
    document.querySelector(".order-list").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

const renderHubInfor = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  const { hub } = user;

  const hubDivElement = document.querySelector(".hub-infor");

  hubDivElement.innerHTML = `
    <h4>Hub Information</h4>
    <ul>
        <li>Name: ${hub.name}</li>
        <li>Address: ${hub.address}</li>
    </ul>
  `;
};

window.handleLogout = () => {
  localStorage.removeItem("user");
  location.reload();
};

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.replace("../login.html");
  }

  renderHubInfor();
  renderOrderList();
};
