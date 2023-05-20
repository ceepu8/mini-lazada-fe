import { handleFormValidation } from "./validation.js";
import { loginApi } from "./apis/loginApi.js";
import { parseQueryString } from "../utils/index.js";

const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...
`;
const handleForm = async (e) => {
  e.preventDefault();

  const { verifyCheckout } = parseQueryString(window.location.search);

  const isError = handleFormValidation("#login-form");
  if (isError) return;

  const loginBtn = document.querySelector(".btn.submit-btn");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(verifyCheckout);

  const loginData = { username, password };

  try {
    // SET SPINNER FOR SUBMIT BUTTON
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);

    const { data, status } = await loginApi.login(loginData);
    if (status === 200) {
      const user = data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: data.accessToken,
          user: data.user,
        })
      );
      const userRole = user.role;
      let url = `/pages/${userRole}/${userRole}.html`;

      if (userRole === "customer") {
        url = `/index.html`;
      }

      if (Boolean(verifyCheckout)) {
        url = `/pages/customer/pages/checkout/index.html`;
      }
      swal({
        title: "Login successfully!",
        icon: "success",
        button: "Move to next page!",
      }).then(() => {
        window.location.assign(url);
      });
    }
  } catch (error) {
    // RESET FOR SUBMIT BUTTON
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }

  loginBtn.innerHTML = "Login";
  loginBtn.removeAttribute("disabled");
};

window.onload = () => {
  var form = document.getElementById("login-form");
  form.addEventListener("submit", handleForm);
};
