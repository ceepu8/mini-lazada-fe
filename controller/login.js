import { handleFormValidation } from "./validation.js";
import { loginApi } from "../api/loginApi.js"

const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...

`
const handleForm = async (e) => {
  e.preventDefault();
  const isError = handleFormValidation("#login-form");
  if (isError) return

  const loginBtn = document.querySelector(".btn.submit-btn")
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const loginData = { username, password }

  try {
    // SET SPINNER FOR SUBMIT BUTTON
    loginBtn.innerHTML = spinner
    loginBtn.setAttribute("disabled", true)

    const { data, status } = await loginApi.login(loginData);
    if (status === 200) {
      const user = data.user
      localStorage.setItem("user", JSON.stringify(
        {
          accessToken: data.accessToken,
          user: data.user
        }
      ))
      const userRole = user.role
      swal({
        title: "Login successfully!",
        icon: "success",
        button: "Move to next page!",
      }).then(() => {
        window.location.assign(`../../pages/${userRole}/${userRole}.html`);
      });
    }
  } catch (error) {
    // RESET FOR SUBMIT BUTTON
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    })
  }

  loginBtn.innerHTML = "Login"
  loginBtn.removeAttribute("disabled")
}

window.onload = () => {
  var form = document.getElementById("login-form");
  form.addEventListener("submit", handleForm);
};
