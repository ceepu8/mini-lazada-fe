const VALIDATION_MESSAGE = {
  required: "Không được bỏ trống",
  textOnly: "Chỉ chấp nhận chữ",
  numberOnly: "Chỉ chấp nhận số",
  email: "Email không đúng định dạng",
  phoneNumber: "Số điện thoại không hợp lệ",
  max: (maxNumber) => `Không được vượt quá ${maxNumber} ký tự`,
  min: (minNumber) => `Không được nhỏ hơn ${minNumber} ký tự`,
};

export const VALIDATIONS = {
  required: function (value) {
    return value !== "";
  },
  phone: function (value) {
    return value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
  },
  email: function (value) {
    return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  },
  text: function (value) {
    return value.match(/^[a-zA-Z ]*$/);
  },
  number: function (value) {
    return value.match(/^[0-9]/);
  },
};

export const handleFormValidation = (form) => {
  let isError = false;
  const myForm = document.querySelector(form);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");

  const fields = [...inputs, ...textareas];

  for (let field of fields) {
    const fieldName = field.id;
    const errorElement = document.querySelector(`.error-message.${fieldName}`);

    const isRequired = Boolean(field.getAttribute("required")) || false;
    const isPhoneNumber = Boolean(field.getAttribute("phone")) || false;
    const isNumberOnly = Boolean(field.getAttribute("numberOnly")) || false;
    const isTextOnly = Boolean(field.getAttribute("textOnly")) || false;
    const isEmail = Boolean(field.getAttribute("email")) || false;

    const maxLength = Number(field.getAttribute("max"));
    const minLength = Number(field.getAttribute("min"));

    if (isRequired && !VALIDATIONS.required(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["required"];
      errorElement.style.color = "#a64452";

      continue;
    }

    if (isPhoneNumber && !VALIDATIONS.phone(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["phoneNumber"];
      errorElement.style.color = "#a64452";

      continue;
    }

    if (isNumberOnly && !VALIDATIONS.number(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["numberOnly"];
      errorElement.style.color = "#a64452";

      continue;
    }

    if (isTextOnly && !VALIDATIONS.text(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["textOnly"];
      errorElement.style.color = "#a64452";

      continue;
    }

    if (isEmail && !VALIDATIONS.email(field.value)) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["email"];
      errorElement.style.color = "#a64452";

      continue;
    }

    if (maxLength && field.value.length > maxLength) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["max"](maxLength);
      errorElement.style.color = "#a64452";

      continue;
    }

    if (minLength && field.value.length <= minLength) {
      isError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["min"](minLength);
      errorElement.style.color = "#a64452";

      continue;
    }

    isError = false;
    errorElement.innerHTML = "";
  }

  const passwordField = document.querySelector(`${form} #password`);
  const confirmPasswordField = document.querySelector(
    `${form} #confirmPassword`
  );

  if (passwordField && confirmPasswordField) {
    let confirmPassErrorElement = document.querySelector(
      ".error-message.confirmPassword"
    );
    if (passwordField.value !== confirmPasswordField.value) {
      isError = true;
      confirmPassErrorElement.innerHTML = "Mật khẩu không trùng khớp";
    } else {
      isError = false;
      confirmPassErrorElement.innerHTML = "";
    }
  }

  return isError;
};
