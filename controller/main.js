window.handleLogout = () => {
  localStorage.removeItem("user");
  location.reload();
};

window.goToLoginPage = () => {
  window.location.assign("../../../login.html");
};

window.goToRegisterPage = () => {
  window.location.assign("../../registration.html");
};

export const renderHeaderUserAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const authHeaderElement = document.querySelector(".header-ctn");
  let html = "";
  if (user) {
    html = `
                <div class="logout-btn">
                  <button class="btn secondary-btn" onclick="handleLogout()">Logout</button>
                </div>
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i class="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div class="qty indexCart"></div>
                  </a>
                </div>
                <div class="menu-toggle">
                  <a href="#">
                    <i class="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
    
    `;
  } else {
    html = `
        <div class="login-btn">
          <button class="btn secondary-btn me-2" onclick="goToRegisterPage()">Register</button>
          <button class="btn primary-btn" onclick="goToLoginPage()">Login</button>
         </div>
    `;
  }

  authHeaderElement.innerHTML = html;
};
