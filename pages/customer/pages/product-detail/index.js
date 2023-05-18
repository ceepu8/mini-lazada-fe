import { customerApi } from "../../../../api/customerApi.js";
import { renderHeaderUserAuth } from "../../../../controller/main.js";
import { currencyFormat, parseQueryString } from "../../../../utils/index.js";

const toggleLoading = (isLoading) => {
  const loadingElement = document.querySelector(".fetching-loading");

  if (isLoading) {
    loadingElement.style.visibility = "visible";
    loadingElement.style.opacity = "1";
    loadingElement.style.minHeight = "calc(100vh - 240px)";
    return;
  }

  loadingElement.style.visibility = "hidden";
  loadingElement.style.opacity = "0";
  loadingElement.style.minHeight = 0;
};

window.addToCart = (id, price, name, image) => {
  const quantity = Number(
    document.querySelector(".input-number .quantity-number").value
  );

  const product = {
    productID: id,
    price,
    name,
    image,
    quantity,
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newCart = [];

  const foundProduct = cart.findIndex(
    (prod) => prod.productID === product.productID
  );
  if (foundProduct !== -1) {
    newCart = cart.map((prod) => {
      if (prod.productID === product.productID) {
        return { ...prod, quantity: prod.quantity + product.quantity };
      }
      return prod;
    });
  } else {
    newCart = [...cart, product];
  }
  swal({
    title: "Add product successfully!",
    icon: "success",
    button: "Close",
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
};

const renderProduct = (product) => {
  const { id, image, name, description, price, vendor } = product || {};

  const html = `
       <div class="col-md-5 col-md-push-2">
              <div class="product-preview-image">
                <img class="dImage" src="${image}" alt="main-product-image" />
              </div>
          </div>
          <div class="col-md-2 col-md-pull-5">
            <div class="product-preview-images">
              <div class="product-preview">
                <img class="dImage" src="${image}" alt="product-image" />
              </div>

              <div class="product-preview">
                <img class="dImage" src="${image}" alt="product-image" />
              </div>

              <div class="product-preview">
                <img class="dImage" src="${image}" alt="product-image" />
              </div>

              <div class="product-preview">
                <img class="dImage" src="${image}" alt="product-image" />
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="product-details">
              <h2 class="product-name detailName">product name goes here</h2>
              <div>
                <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                <a class="review-link" href="#"
                  >10 Review(s) | Add your review</a
                >
              </div>
              <div>
                <h3 class="product-price detailPrice">
                  ${currencyFormat(
                    price
                  )} <del class="product-old-price">${currencyFormat(
    price + price * 0.15
  )}</del>
                </h3>
                <span class="product-available">In Stock</span>
              </div>
              <p class="detailDes">
                ${description}
              </p>

              <div class="add-to-cart">
                <div class="qty-label">
                  Qty
                  <div class="input-number">
                    <input class="quantity-number" type="number" value="1"/>
                    <span class="qty-up">+</span>
                    <span class="qty-down">-</span>
                  </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${id}', ${price}, '${name}', '${image}')">
                  <i class="fa fa-shopping-cart"></i>add to cart
                </button>
              </div>

              <ul class="product-btns">
                <li>
                  <a href="#"><i class="fa fa-heart-o"></i> add to wishlist</a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-exchange"></i> add to compare</a>
                </li>
              </ul>

              <ul class="product-links">
                <li>Category:</li>
                <li><a href="#">Headphones</a></li>
                <li><a href="#">Accessories</a></li>
              </ul>

              <ul class="product-links">
                <li>Share:</li>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-envelope"></i></a>
                </li>
              </ul>
            </div>
          </div>   
  
  `;

  document.querySelector(".product-details").innerHTML = html;
};

const fetchProduct = async (id) => {
  try {
    toggleLoading(true);
    const { data } = await customerApi.getProductById(id);
    renderProduct(data.product);
    toggleLoading(false);
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  const { id } = parseQueryString(window.location.search);
  if (!id) window.location.replace("../home/index.html");
  fetchProduct(id);
  renderHeaderUserAuth();
};
