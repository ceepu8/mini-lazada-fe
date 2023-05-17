import { customerApi } from "../../../../api/customerApi.js";
import { currencyFormat, parseQueryString } from "../../../../utils/index.js";

const fetchProducts = async (page = 1, limit = 8) => {
  try {
    const {
      data: { currentPage, totalPages, products },
      status,
    } = await customerApi.getProducts({ page, limit });

    renderProducts(products, currentPage, totalPages);
  } catch (error) {
    console.log(error);
  }
};

const renderPagination = (currentPage, totalPages) => {
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
                return `<li class="page-item ${
                  isActive && "active"
                }"><a class="page-link" href="./index.html?page=${index + 1}">${
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

const renderProducts = (products = [], currentPage, totalPages) => {
  const html = products
    .map((product) => {
      const { id, image, name, price, description, vendor } = product;
      return `
        <div class="col-md-4">
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
  const { page = 1 } = parseQueryString(window.location.search);

  fetchProducts(page, LIMIT_PRODUCT_PAGE);
};
