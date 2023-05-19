import { renderHeaderUserAuth } from "../../../../controller/main.js";
import { profileApi } from "../../../../api/profileApi.js";
import { customerApi } from "../../../../api/customerApi.js";
import { currencyFormat, formatDate } from "../../../../utils/index.js";

const loginBtn = document.querySelector(".btn.submit-btn");
const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...
`;

const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);

    const { data } = await profileApi.getProfile(user.accessToken);
    if (!data) {
      window.location = "/pages/login.html";
    }
    const form = document.querySelector("form#profile-form");

    const inputs = form.querySelectorAll(".form-field");

    for (let input of inputs) {
      const inputId = input.id;
      input.value = data.data[inputId];
    }

    const imageURL =
      data.data.profileImage || "../../../../assets/browser-icon.webp";

    const imageElement = document.getElementById("profile-image");
    imageElement.src = imageURL;

    loginBtn.innerHTML = "Change Avatar";
    loginBtn.removeAttribute("disabled");
  } catch (error) {
    console.log(error);
  }
};

const loadUser = async () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  const form = document.querySelector("form#profile-form");
  const inputs = form.querySelectorAll(".form-field");

  for (let input of inputs) {
    const inputId = input.id;
    input.value = user[inputId];
  }

  const imageURL = user.profileImage || "../../../../assets/browser-icon.webp";

  const imageElement = document.getElementById("profile-image");
  imageElement.src = imageURL;

  loginBtn.innerHTML = "Change Avatar";
  loginBtn.removeAttribute("disabled");
};

const addAvatar = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  const file = document.getElementById("file").files[0];

  formData.append("file", file);

  try {
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);
    const { data, status } = await profileApi.uploadAvatar(
      user.accessToken,
      formData
    );
    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      });
      getProfile();
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
  loginBtn.innerHTML = "Change Avatar";
  loginBtn.removeAttribute("disabled");
};

window.loadFile = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const imageElement = document.getElementById("profile-image");
      imageElement.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }

  addAvatar();
};

const fetchOrders = async () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  try {
    const { data } = await customerApi.getOrders(accessToken);
    console.log(data.data);
    renderOrders(data.data);
  } catch (error) {
    console.log(error);
  }
};

const renderOrders = (data = []) => {
  let html = "";

  if (!data.length) {
    html = "<span>There is note any orders</span>";
    document.querySelector("#order-list .orders").innerHTML = html;
    return;
  }

  html = data.reduce((result, each) => {
    const {
      id,
      product,
      totalPrice,
      customer,
      status = "active",
      createdAt,
      hub,
    } = each;
    return (
      result +
      `   
             <div class="order-item">
                <div class="order-customer">
                  <div class="badge-group">
                  <span class="badge ${status}">${status}</span>
                  <span class="badge mall">Mall</span>
                  </div>
                  <h5 class="line-clamp-2">Order ID: ${id}</h5>
                  <div><span>Created at: ${formatDate(createdAt)}</span></div>
                  <div><span>Customer's Name:</span> ${customer.name}</div>
                  <div><span>Customer's Address:</span> ${
                    customer.address
                  }</div>
                  <div><span>Hub: ${hub.name} - ${hub.address}</span></div>
                </div>
                <div class="line-break"></div>
                <div class="order-products">
                    ${product
                      .map((each) => {
                        const { name, quantity, image, price } = each;
                        return `
                            <div class="product-infor row">
                                <div class="product-other-infor col-sm-9">
                                  <div class="product-image">
                                    <img src='${image}' alt="product-image"/>
                                  </div>
                                  <div class="product-quantity">
                                    <p class="name">${name}</p>
                                    <span>x${quantity}</span>
                                    <div class="return-badge">7 ngày trả hàng</div>
                                  </div>
                                </div>
                                <div class="product-price col-sm-3">
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
        `
    );
  }, "");

  document.querySelector("#order-list .orders").innerHTML = html;
};

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location = "/index.html";
  }

  loadUser();
  renderHeaderUserAuth();
  fetchOrders();
};
