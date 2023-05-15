import { authApi } from "../../api/authApi.js";
import { shipperApi } from "../../api/shipperApi.js";
import { handleFormValidation } from "../validation.js";

const formElementName = "shipper-registration-form";
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
  const fields = myForm.querySelectorAll("input, textarea, select");

  const newShipper = {
    role: "shipper",
  };

  for (let field of fields) {
    newShipper[field.id] = field.value;
  }
  delete newShipper.confirmPassword;

  try {
    submitBtn.innerHTML = spinner;
    submitBtn.setAttribute("disabled", true);
    const { data, status } = await authApi.register(newShipper);
    console.log(status);
    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      }).then(() => {
        window.location.assign("../../pages/login.html");
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

const renderHubSelectOptions = async () => {
  try {
    const { data } = await shipperApi.getHubs();
    const html = data?.data.reduce((result, hub) => {
      const { name, _id: id, address } = hub;
      return result + `<option value="${id}">${name}</option>`;
    }, "");

    const select = document.querySelector("select#hub");
    select.innerHTML = html;
  } catch (error) {}
};

window.onload = () => {
  renderHubSelectOptions();
  const vendorRegistrationForm = document.getElementById(`${formElementName}`);

  vendorRegistrationForm.addEventListener(
    "submit",
    handleVendorRegistrationForm
  );
};
