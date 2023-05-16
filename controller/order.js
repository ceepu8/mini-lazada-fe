import { shipperApi } from "../api/shipperApi.js";
import {
  currencyFormat,
  formatDate,
  parseQueryString,
} from "../utils/index.js";

const handleRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.replace("../login.html");
  }
};

window.handleUpdateOrderStatus = async (orderId) => {
  handleRedirect();
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const orderStatus = document.getElementById("order-status").value || "active";
  const spinner = document.querySelector(".spinner.status-spinner");

  try {
    spinner.style.visibility = "visible";
    spinner.style.opacity = 1;
    const { data, status } = await shipperApi.updateOrderStatus(
      accessToken,
      orderId,
      orderStatus
    );

    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      });
      const badgeStatus = document.querySelector(".badge.badge-status");
      badgeStatus.innerHTML = orderStatus;
      badgeStatus.className = `badge ${orderStatus} badge-status`;
      spinner.style.visibility = "hidden";
      spinner.style.opacity = 0;
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
};

const renderOrderDetail = async (orderId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const loadingElement = document.querySelector(".order-loading");

  try {
    loadingElement.style.visibility = "visible";
    loadingElement.style.opacity = "1";
    loadingElement.style.minHeight = "calc(100vh - 240px)";
    const {
      data: { data },
      status: resStatus,
    } = await shipperApi.getOrder(accessToken, orderId);

    if (resStatus === 200) {
      const {
        status,
        customer,
        products,
        totalPrice,
        id = orderId,
        createdAt,
      } = data.order;

      const html = `
           <div class="order-item">
                <div class="order-header">
                    <div class="back-button">
                        <a href="./shipper.html">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div class="select-wrapper">
                        <div class="spinner-border text-primary spinner status-spinner" role="status">
                            <span class="visually-hidden">Loading...</span>
                         </div>
                         <select class="form-field" id="order-status" name="order-status" required="true" onchange="handleUpdateOrderStatus('${id}')">
                             <option value="active">Active</option>
                             <option value="delivered">Delivered</option>
                             <option value="canceled">Canceled</option>
                        </select>
                        <i class="fa-solid fa-chevron-down" id="chevron-arrow-select"></i>
                    </div>
                </div>
                <div class="order-customer">
                  <div class="badge-group">
                    <span class="badge ${status} badge-status">${status}</span>
                    <span class="badge mall">Mall</span>
                  </div>
                  <h5>Order ID: ${id}</h5>
                  <div><span>Created at: ${formatDate(createdAt)}</span></div>
                  <div><span>Customer's Name:</span> ${customer.name}</div>
                  <div><span>Customer's Address:</span> ${
                    customer.address
                  }</div>
                </div>
                <div class="line-break"></div>
                <div class="order-products">
                        ${products
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
                </div>
            </div>
    `;

      const orderDetail = document.querySelector(".order-details");
      orderDetail.innerHTML = html;

      const orderStatus = document.querySelector("#order-status");
      orderStatus.value = status;

      loadingElement.style.visibility = "hidden";
      loadingElement.style.opacity = "0";
      loadingElement.style.minHeight = 0;
    }
  } catch (error) {}
};

window.onload = () => {
  handleRedirect();

  const { id } = parseQueryString(window.location.search);
  if (!id) window.location.assign("../login.html");

  renderOrderDetail(id);
};
