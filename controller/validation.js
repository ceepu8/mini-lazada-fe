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
  const myForm = document.querySelector(form);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");
  const errorArr = []

  const fields = [...inputs, ...textareas];

  for (let field of fields) {
    const fieldName = field.id;
    const errorElement = document.querySelector(`.error-message.${fieldName}`);
    let isFieldError = false

    const isRequired = field.hasAttribute("required");
    const isPhoneNumber = field.hasAttribute("phone");
    const isNumberOnly = field.hasAttribute("numberOnly");
    const isTextOnly = field.hasAttribute("textOnly");
    const isEmail = field.hasAttribute("email");

    const maxLength = Number(field.getAttribute("max"));
    const minLength = Number(field.getAttribute("min"));

    if (isRequired && !VALIDATIONS.required(field.value)) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["required"];
      errorElement.style.color = "#a64452";
    } else if (isPhoneNumber && !VALIDATIONS.phone(field.value)) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["phoneNumber"];
      errorElement.style.color = "#a64452";
    } else if (isNumberOnly && !VALIDATIONS.number(field.value)) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["numberOnly"];
      errorElement.style.color = "#a64452";
    } else if (isTextOnly && !VALIDATIONS.text(field.value)) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["textOnly"];
      errorElement.style.color = "#a64452";
    } else if (isEmail && !VALIDATIONS.email(field.value)) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["email"];
      errorElement.style.color = "#a64452";
    } else if (maxLength && field.value.length > maxLength) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["max"](maxLength);
      errorElement.style.color = "#a64452";
    } else if (minLength && field.value.length <= minLength) {
      isFieldError = true
      errorElement.innerHTML = VALIDATION_MESSAGE["min"](minLength);
      errorElement.style.color = "#a64452";
    } else {
      isFieldError = false
      errorElement.innerHTML = ""
    }

    let isPassword = false
    const passwordField = document.querySelector(`${form} #password`);
    const confirmPasswordField = document.querySelector(
      `${form} #confirmPassword`
    );

    if (passwordField && confirmPasswordField) {
      let confirmPassErrorElement = document.querySelector(
        ".error-message.confirmPassword"
      );
      if (passwordField.value !== confirmPasswordField.value) {
        isPassword = true
        confirmPassErrorElement.innerHTML = "Mật khẩu không trùng khớp";
      } else {
        isPassword = false
        confirmPassErrorElement.innerHTML = "";
      }
    }

    errorArr.push(isFieldError || isPassword)
  }
  if (errorArr.includes(true)) return true;

  return false;
};
