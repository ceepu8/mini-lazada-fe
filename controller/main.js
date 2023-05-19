window.handleLogout = () => {
  localStorage.removeItem("user");
  location.reload();
};

window.goToLoginPage = () => {
  window.location = "/pages/login.html";
};

window.goToRegisterPage = () => {
  window.location = "/pages/customer/registration.html";
};

export const renderHeaderUserAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  const authHeaderElement = document.querySelector(".header-ctn");
  let html = "";
  if (user) {
    html = `
                <div class="dropdown">
                  <a href="../profile/index.html">
                    <i class="fa fa-user"></i>
                    <span>Your Profile</span>
                  </a>
                </div>
                <div class="dropdown">
                  <a href="/pages/customer/pages/shopping-cart/index.html">
                    <i class="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div class="qty indexCart">${cart?.length || 0}</div>
                  </a>
                </div>
                </div>
                <div class="logout-btn">
                  <button class="btn secondary-btn" onclick="handleLogout()">Logout</button>
                </div>
    
    `;
  } else {
    html = `
          <button class="btn secondary-btn me-2" onclick="goToRegisterPage()">Register</button>
          <button class="btn primary-btn" onclick="goToLoginPage()">Login</button>
          <div class="dropdown">
            <a href="../shopping-cart/index.html">
              <i class="fa fa-shopping-cart"></i>
              <span>Your Cart</span>
              <div class="qty indexCart">${cart?.length || 0}</div>
            </a>
         </div>
    `;
  }

  authHeaderElement.innerHTML = html;
};
