const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

const USER = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY0NGY2YmY5OWEzZTI1YTE2YmIwODcwOSIsInVzZXJuYW1lIjoidXllbmNhb2J1c2luZXNzIiwicm9sZSI6InZlbmRvciJ9LCJpYXQiOjE2ODMxMDQ0MTQsImV4cCI6MTY4MzE0MDQxNH0.rX-KPJ1T6LeDM7zAO2ED0iBCLNkXhQSrQRMUaPLL284",
  user: {
    username: "uyencaobusiness",
    role: "vendor",
    businessName: "uyen cao with business",
    businessAddress: "BUSINESS street",
  },
};

const renderProduct = async () => {
  const productTable = document.querySelector(
    "#product .product-table .table-body"
  );
  try {
    document.querySelector(".product-loading").style.visibility = "visible";
    document.querySelector(".product-loading").style.opacity = "1";
    document.querySelector(".product-loading").style.minHeight =
      "calc(100vh - 240px)";
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/product/get-my-products`,
      headers: {
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });

    if (data.products.length <= 0) {
      const node = document.createElement("h3");
      node.style.margin = "42px 0";
      node.innerHTML = "There is not any products";

      productTable.appendChild(node);

      document.querySelector(".product-loading").style.visibility = "hidden";
      document.querySelector(".product-loading").style.opacity = "0";
      document.querySelector(".product-loading").style.minHeight = 0;

      return;
    }

    const html = data.products.reduce((result, product, idx) => {
      const { id, name, price, description, image } = product;
      return (
        result +
        `
              <tr>
                <th scope="row">${idx + 1}</th>
                <td>${name}</td>
                <td>${description}</td>
                <td>${price}</td>
                <td>
                    <img class="product-image" alt="product-image" src="${image}"/>
                </td>
                <td>
                  <button class="update-button" type="button">Update</button>
                  <button class="delete-button" type="button">Delete</button>
                </td>
              </tr>
            `
      );
    }, "");

    document.querySelector(".product-loading").style.visibility = "hidden";
    document.querySelector(".product-loading").style.opacity = "0";
    document.querySelector(".product-loading").style.minHeight = 0;
    productTable.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

window.addProduct = async () => {
  const formData = new FormData();

  const name = document.getElementById("form-control-input-name").value;
  const price = document.getElementById("form-control-input-price").value;
  const description = document.getElementById(
    "form-control-textarea-description"
  ).value;
  const file = document.getElementById("form-control-file-image").files[0];

  formData.append("file", file);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);

  try {
    const { data, status } = await axios({
      method: "post",
      url: `${API_URL}/product`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });
    if (status === 200) {
      new AWN().success(data.message, {
        durations: { success: 1000 },
      });
    }

    var myModal = new bootstrap.Modal(
      document.getElementById("add-product-modal")
    );
    renderProduct();
    document.getElementById("modal-add-product-form").reset();
    myModal.hide();
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
      const node = document.createElement("img");
      node.setAttribute("src", e.target.result);
      node.setAttribute("alt", "product-image");

      document
        .querySelector(
          "#product .modal .modal-dialog .modal-body .form-group-upload-image"
        )
        .appendChild(node);
    };

    reader.readAsDataURL(input.files[0]);
  }
};

window.onload = () => {
  renderProduct();
};
