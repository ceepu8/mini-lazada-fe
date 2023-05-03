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
    const { data } = await axios.get(`${API_URL}/product`);
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
    const { data } = await axios({
      method: "post",
      url: `${API_URL}/product`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });

    console.log(data);
    renderProduct();
  } catch (error) {
    console.log(error);
  }
};

window.readURL = (input) => {
  if (input.files && input.files[0]) {
    console.log(input.files);
    var reader = new FileReader();

    reader.onload = function (e) {
      document
        .getElementById("product-preview-image")
        .setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
};

window.onload = () => {
  renderProduct();
};
