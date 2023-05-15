import { vendorApi } from "../api/vendorApi.js";
import { currencyFormat } from "../utils/index.js";
import { handleFormValidation } from "./validation.js";
const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...
`;
const renderProduct = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const productTable = document.querySelector(
    "#product .product-table .table-body"
  );

  const loadingElement = document.querySelector(".product-loading");
  try {
    loadingElement.style.visibility = "visible";
    loadingElement.style.opacity = "1";
    loadingElement.style.minHeight = "calc(100vh - 240px)";
    const { data } = await vendorApi.getMyProducts(user.accessToken);

    if (data.products.length <= 0) {
      const node = document.createElement("h3");
      node.style.margin = "42px 0";
      node.innerHTML = "There is not any products";

      productTable.appendChild(node);

      loadingElement.style.visibility = "hidden";
      loadingElement.style.opacity = "0";
      loadingElement.style.minHeight = 0;

      return;
    }

    const html = data.products.reduce((result, product, idx) => {
      const { name, price, description, image } = product;
      return (
        result +
        `
              <tr>
                <th scope="row">${idx + 1}</th>
                <td>${name}</td>
                <td>${description}</td>
                <td>${currencyFormat(price)}</td>
                <td>
                    <div class="product-image">
                      <img alt="product-image" src="${image}"/>
                    </div>
                </td>
                <td>
                  <div class="setting-buttons">
                    <button class="update-button" type="button">Update</button>
                    <button class="delete-button" type="button">Delete</button>
                  </div>
                </td>
              </tr>
            `
      );
    }, "");

    loadingElement.style.visibility = "hidden";
    loadingElement.style.opacity = "0";
    loadingElement.style.minHeight = 0;
    productTable.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

window.addProduct = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  const isValidated = handleFormValidation("#modal-add-product-form");
  if (isValidated) return;

  const loginBtn = document.querySelector(".btn.submit-btn");
  const name = document.getElementById("input-name").value;
  const price = document.getElementById("input-price").value;
  const description = document.getElementById("textarea-description").value;
  const file = document.getElementById("file-image").files[0];

  formData.append("file", file);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);

  try {
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);
    const { data, status } = await vendorApi.createProduct(
      user.accessToken,
      formData
    );
    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      });
    }

    renderProduct();
    document.getElementById("modal-add-product-form").reset();

    var myModalEl = document.getElementById("add-product-modal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    document.querySelector(
      "#product .modal .modal-dialog .modal-body .form-group-upload-image .preview-image"
    ).innerHTML = "";
  } catch (error) {
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
  loginBtn.innerHTML = "Add";
  loginBtn.removeAttribute("disabled");
};

window.readURL = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(
        "#product .modal .modal-dialog .modal-body .form-group-upload-image .preview-image"
      ).innerHTML = `<img src="${e.target.result}" alt="product-image"/>`;
    };

    reader.readAsDataURL(input.files[0]);
  }
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

  renderProduct();
};
