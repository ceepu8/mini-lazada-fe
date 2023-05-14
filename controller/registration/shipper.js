import { authApi } from "../../api/authApi.js";
import { shipperApi } from "../../api/shipperApi.js";
import { handleFormValidation } from "../validation.js";

const formElementName = "shipper-registration-form";

const handleVendorRegistrationForm = async (e) => {
  e.preventDefault();
  const isError = handleFormValidation(`#${formElementName}`);
  if (isError) return;
  const myForm = document.querySelector(`#${formElementName}`);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");
  const fields = [...inputs, ...textareas];

  const newShipper = {
    role: "shipper",
  };

  for (let field of fields) {
    newShipper[field.id] = field.value;
  }
  delete newShipper.confirmPassword;

  console.log(newShipper);
  //   try {
  //     const { data, status } = await authApi.register(newShipper);
  //     console.log(status);
  //     if (status === 200) {
  //       new AWN().success(data.message, {
  //         durations: { success: 1000 },
  //       });
  //       setTimeout(() => {
  //         window.location.assign("../../pages/login.html");
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     new AWN().alert(error.message, {
  //       durations: { success: 1000 },
  //     });
  //   }
};

const renderHubSelectOptions = async () => {
  try {
    const { data } = await shipperApi.getHubs();
    const html = data?.data.reduce((result, hub) => {
      const { name, _id: id, address } = hub;
      return result + `<option value="${id}">${name}</option>`;
    }, "");

    const select = document.querySelector("select#hub-select");
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
