import { authApi } from "../apis/authApi.js";
import { handleFormValidation } from "../validation.js";

const formElementName = "customer-registration-form";
const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...
`;

const handleVendorRegistrationForm = async (e) => {
  e.preventDefault();
  const submitBtn = document.querySelector(".btn.submit-btn");
  const isError = handleFormValidation(`#${formElementName}`);
  if (isError) return;
  const myForm = document.querySelector(`#${formElementName}`);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");
  const fields = [...inputs, ...textareas];

  const newShipper = {
    role: "customer",
  };

  for (let field of fields) {
    newShipper[field.id] = field.value;
  }
  delete newShipper.confirmPassword;

  try {
    submitBtn.innerHTML = spinner;
    submitBtn.setAttribute("disabled", true);
    const { data, status } = await authApi.register(newShipper);
    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      }).then(() => {
        window.location = "/pages/login.html";
      });
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
  submitBtn.innerHTML = "Register";
  submitBtn.removeAttribute("disabled");
};

window.onload = () => {
  const vendorRegistrationForm = document.getElementById(`${formElementName}`);

  vendorRegistrationForm.addEventListener(
    "submit",
    handleVendorRegistrationForm
  );
};
