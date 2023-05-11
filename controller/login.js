import { handleFormValidation } from "./validation";

function handleForm(e) {
  e.preventDefault();
  var username = document.querySelector("#username");
  var password = document.querySelector("#password");

  const isError = handleFormValidation("#login-form");

  console.log(isError);

  //   if (username.value.trim() == "" || password.value.trim() == "") {
  //     error_msg.style.display = "inline-block";
  //     username.style.border = "1px solid #f74040";
  //     password.style.border = "1px solid #f74040";
  //     return false;
  //   }
}

window.onload = () => {
  var form = document.getElementById("login-form");
  form.addEventListener("submit", handleForm);
};
