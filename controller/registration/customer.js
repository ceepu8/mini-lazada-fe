import { handleFormValidation } from "./validation.js";

const handleCustomerRegistrationForm = (e) => {
  e.preventDefault();
  var username = document.querySelector("#username");
  var password = document.querySelector("#password");
  var error_msg = document.querySelector(".error_msg");

  const isError = handleFormValidation("#customer-registration-form");

  console.log(isError);
};

window.onload = () => {
  var customerRegistrationForm = document.getElementById(
    "customer-registration-form"
  );
  console.log(customerRegistrationForm);
  customerRegistrationForm.addEventListener(
    "submit",
    handleCustomerRegistrationForm
  );
};
