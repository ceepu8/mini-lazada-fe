const VALIDATE_BY_TYPE = {
  "product-name": ["required", "textOnly"],
  "product-price": ["required", "numberOnly"],
  "product-description": ["required"],
  "product-image": ["required"],
};
const VALIDATION_MESSAGE = {
  required: "Không được bỏ trống",
  textOnly: "Chỉ chấp nhận chữ",
  numberOnly: "Chỉ chấp nhận số",
};

export const VALIDATIONS = {
  required: function (value) {
    return value !== "";
  },
  phone: function (value) {
    return value.match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
  },
  email: function (value) {
    return value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
  text: function (value) {
    return value.match(/^[a-zA-Z ]*$/);
  },
  number: function (value) {
    return value.match(/^[0-9]/);
  },
};

export const handleAddProductFormValidation = (form) => {
  let isError = false;
  const myForm = document.querySelector(form);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");

  const fields = [...inputs, ...textareas];

  for (let field of fields) {
    const fieldName = field.id;
    const fieldValidate = VALIDATE_BY_TYPE[field.getAttribute("validate")];
    const errorElement = document.querySelector(`.error-message.${fieldName}`);

    for (let valid of fieldValidate) {
      if (valid === "required" && !VALIDATIONS.required(field.value)) {
        isError = true;
        errorElement.innerHTML = VALIDATION_MESSAGE[valid];
        break;
      } else {
        isError = false;
        errorElement.innerHTML = "";
      }

      if (valid === "numberOnly" && !VALIDATIONS.number(field.value)) {
        isError = true;
        errorElement.innerHTML = VALIDATION_MESSAGE[valid];

        break;
      } else {
        isError = false;
        errorElement.innerHTML = "";
      }

      if (valid === "textOnly" && !VALIDATIONS.text(field.value)) {
        console.log(123);
        isError = true;
        errorElement.innerHTML = VALIDATION_MESSAGE[valid];

        break;
      } else {
        isError = false;
        errorElement.innerHTML = "";
      }
    }
  }

  return isError;
};
