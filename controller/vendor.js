const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

const USER = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY0NGY2YmY5OWEzZTI1YTE2YmIwODcwOSIsInVzZXJuYW1lIjoidXllbmNhb2J1c2luZXNzIiwicm9sZSI6InZlbmRvciJ9LCJpYXQiOjE2ODMwMjkwNzQsImV4cCI6MTY4MzA2NTA3NH0.ppuCwmQRDJYVxdBuGFv0pcs16ZyngmLZT_KFd8wE9q4",
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

window.onload = () => {
  renderProduct();
};
