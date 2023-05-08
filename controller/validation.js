const VALIDATION_MESSAGE = {
  required: "Không được bỏ trống",
  textOnly: "Chỉ chấp nhận chữ",
  numberOnly: "Chỉ chấp nhận số",
  email: "Email không đúng định dạng",
  max: (maxNumber) => `Không được vượt quá ${maxNumber} ký tự`,
  min: (minNumber) => `Không được nhỏ hơn ${minNumber} ký tự`,
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
    const errorElement = document.querySelector(`.error-message.${fieldName}`);

    const isRequired = Boolean(field.getAttribute("required")) || false;
    const isNumberOnly = Boolean(field.getAttribute("numberOnly")) || false;
    const isTextOnly = Boolean(field.getAttribute("textOnly")) || false;
    const isEmail = Number(field.getAttribute("email"));

    const maxLength = Number(field.getAttribute("max"));
    const minLength = Number(field.getAttribute("min"));

    if (isRequired && !VALIDATIONS.required(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["required"];
      continue;
    }

    if (isNumberOnly && !VALIDATIONS.number(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["numberOnly"];
      continue;
    }

    if (isTextOnly && !VALIDATIONS.text(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["textOnly"];
      continue;
    }

    if (isEmail && !VALIDATIONS.email(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["email"];
      continue;
    }

    if (maxLength && field.value.length > maxLength) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["max"](maxLength);
      continue;
    }

    if (minLength && field.value.length <= minLength) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["min"](minLength);
      continue;
    }

    isError = false;
    errorElement.innerHTML = "";
  }

  return isError;
};
