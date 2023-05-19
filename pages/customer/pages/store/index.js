import { customerApi } from "../../../../controller/apis/customerApi.js";
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

const fetchProducts = async (page = 1, limit = 8, max, min) => {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";
  try {
    toggleLoading(true);
    const {
      data: { currentPage, totalPages, products },
      status,
    } = await customerApi.getProducts({ page, limit, max, min });

    renderProducts(products, currentPage, totalPages);
    toggleLoading(false);
  } catch (error) {
    console.log(error);
  }
};

window.getMaxMinFilterPrice = () => {
  const max = document.querySelector(".input-number #price-max").value * 1;
  const min = document.querySelector(".input-number #price-min").value * 1;
  let searchURL = `index.html?page=1&limit=9&max=${max}&min=${min}`;

  if (!max || !min) {
    searchURL = `index.html?page=1&limit=9`;
  }

  window.location.replace(searchURL);
};

const renderPagination = (currentPage, totalPages) => {
  const {
    page = 1,
    limit = 9,
    max,
    min,
  } = parseQueryString(window.location.search);

  const html = `
      <div class="col-md-12">
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
            ${Array(totalPages)
              .fill()
              .map((_, index) => {
                const isActive = currentPage === index + 1;
                let nextPage = `./index.html?page=${index + 1}&limit=${limit}`;

                if (max && min) {
                  nextPage = `./index.html?page=${
                    index + 1
                  }&limit=${limit}&max=${max}&min=${min}`;
                }

                return `<li class="page-item ${
                  isActive && "active"
                }"><a class="page-link" href="${nextPage}">${
                  index + 1
                }</a></li>`;
              })
              .join("")}
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>  
      </div>
  `;

  return html;
};

window.goToProductDetailPage = (productID) => {
  let url = `../product-detail/index.html?id=${productID}`;
  window.location.replace(url);
};

const renderProducts = (products = [], currentPage, totalPages) => {
  const html = products
    .map((product) => {
      const { id, image, name, price, description, vendor } = product;

      return `
        <div class="col-md-4" onclick="goToProductDetailPage('${id}')">
          <div class="product">
            <div class="product-img">
              <img class="indexImage" src="${image}" alt="" />
              <div class="product-label">
                <span class="sale">-15%</span>
                <span class="new">NEW</span>
              </div>
            </div>
            <div class="product-body">
              <p class="product-category">Category</p>
              <h3 title="${name}" class="product-name indexName line-clamp-1">
                <a href="#">${name}</a>
              </h3>
              <h4 class="product-price indexPrice">
                ${currencyFormat(
                  price
                )} <del class="product-old-price">${currencyFormat(
        price + price * 0.15
      )}</del>
              </h4>
              <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="product-btns">
                <button class="add-to-wishlist">
                  <i class="fa fa-heart-o"></i
                  ><span class="tooltipp">add to wishlist</span>
                </button>
                <button class="add-to-compare">
                  <i class="fa fa-exchange"></i
                  ><span class="tooltipp">add to compare</span>
                </button>
                <button class="quick-view">
                  <i class="fa fa-eye"></i
                  ><span class="tooltipp">quick view</span>
                </button>
              </div>
            </div>
          </div>    
        </div>              
    `;
    })
    .join("");

  const productElement = document.querySelector(".product-list");
  productElement.innerHTML = html + renderPagination(currentPage, totalPages);
};

window.onload = () => {
  const LIMIT_PRODUCT_PAGE = 9;
  const {
    page = 1,
    limit = LIMIT_PRODUCT_PAGE,
    max,
    min,
  } = parseQueryString(window.location.search);

  console.log(limit);

  const maxElement = document.querySelector(".input-number #price-max");
  const minElement = document.querySelector(".input-number #price-min");

  maxElement.value = max;
  minElement.value = min;

  fetchProducts(page, limit, max, min);
  renderHeaderUserAuth();
};
