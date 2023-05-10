import { authApi } from "../../api/authApi.js";
import { handleFormValidation } from "../validation.js";

const formElementName = "vendor-registration-form";

const handleVendorRegistrationForm = async (e) => {
  e.preventDefault();
  const isError = handleFormValidation(`#${formElementName}`);
  if (isError) return;
  const myForm = document.querySelector(`#${formElementName}`);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");
  const fields = [...inputs, ...textareas];

  const newVendor = {
    role: "vendor",
  };
  for (let field of fields) {
    newVendor[field.id] = field.value;
  }
  delete newVendor.confirmPassword;

  try {
    const { data, status } = await authApi.register(newVendor);
    console.log(status);
    if (status === 200) {
      new AWN().success(data.message, {
        durations: { success: 1000 },
      });
      setTimeout(() => {
        window.location.assign("../../pages/login.html");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    new AWN().alert(error.message, {
      durations: { success: 1000 },
    });
  }
};

window.onload = () => {
  const vendorRegistrationForm = document.getElementById(`${formElementName}`);

  vendorRegistrationForm.addEventListener(
    "submit",
    handleVendorRegistrationForm
  );
};
