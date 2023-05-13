import { vendorApi } from "../api/vendorApi.js";
import { currencyFormat } from "../utils/index.js";
import { handleFormValidation } from "./validation.js";
const USER = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY0NGY2YmY5OWEzZTI1YTE2YmIwODcwOSIsInVzZXJuYW1lIjoidXllbmNhb2J1c2luZXNzIiwicm9sZSI6InZlbmRvciJ9LCJpYXQiOjE2ODM3MTQ5MzEsImV4cCI6MTY4Mzc1MDkzMX0.k0e6zfq-gII4Cf5qMadLXijd6jioATL5P-Rl4y1ZGSc",
  user: {
    username: "uyencaobusiness",
    role: "vendor",
    businessName: "uyen cao with business",
    businessAddress: "BUSINESS street",
  },
};

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
  if (isValidated) {
    return;
  }

  const name = document.getElementById("input-name").value;
  const price = document.getElementById("input-price").value;
  const description = document.getElementById("textarea-description").value;
  const file = document.getElementById("file-image").files[0];

  formData.append("file", file);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);

  try {
    const { data, status } = await vendorApi.createProduct(
      user.accessToken,
      formData
    );
    if (status === 200) {
      new AWN().success(data.message, {
        durations: { success: 1000 },
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
    console.log(error);
    new AWN().alert(error.message, {
      durations: { success: 1000 },
    });
  }
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

window.onload = () => {
  localStorage.setItem("user", JSON.stringify(USER));

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.replace("../login.html");
  }

  renderProduct();
};
