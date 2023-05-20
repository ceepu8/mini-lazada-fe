const VALIDATION_MESSAGE = {
  required: "This field is required",
  textOnly: "Only accept text",
  numberOnly: "Only accept number",
  email: "Invalid Email",
  phoneNumber: "Invalid phone number",
  max: (maxNumber) => `Please enter a value less than ${maxNumber} characters`,
  min: (minNumber) => `Please enter a value more than ${minNumber} characters`,
  username:
    "Invalid username. Username must contain 8-15 numbers and digits only",
  password:
    "Invalid password. Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
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
  username: function (value) {
    return value.match(
      /^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    );
  },
  password: function (value) {
    return value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
  },
};

export const handleFormValidation = (form) => {
  const myForm = document.querySelector(form);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");
  const errorArr = [];

  const fields = [...inputs, ...textareas];

  for (let field of fields) {
    const fieldName = field.id;
    const errorElement = document.querySelector(`.error-message.${fieldName}`);
    let isFieldError = false;

    const isRequired = field.hasAttribute("required");
    const isPhoneNumber = field.hasAttribute("phone");
    const isNumberOnly = field.hasAttribute("numberOnly");
    const isTextOnly = field.hasAttribute("textOnly");
    const isEmail = field.hasAttribute("email");
    const isUsername = field.hasAttribute("username");
    const isValidPassword = field.hasAttribute("password");

    const maxLength = Number(field.getAttribute("max"));
    const minLength = Number(field.getAttribute("min"));

    if (isRequired && !VALIDATIONS.required(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["required"];
    } else if (isPhoneNumber && !VALIDATIONS.phone(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["phoneNumber"];
    } else if (isNumberOnly && !VALIDATIONS.number(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["numberOnly"];
    } else if (isTextOnly && !VALIDATIONS.text(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["textOnly"];
    } else if (isEmail && !VALIDATIONS.email(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["email"];
    } else if (maxLength && field.value.length > maxLength) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["max"](maxLength);
    } else if (minLength && field.value.length <= minLength) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["min"](minLength);
    } else if (isUsername && !VALIDATIONS.username(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["username"];
    } else if (isValidPassword && !VALIDATIONS.password(field.value)) {
      isFieldError = true;
      errorElement.innerHTML = VALIDATION_MESSAGE["password"];
    } else {
      isFieldError = false;
      errorElement.innerHTML = "";
    }

    let isPassword = false;
    const passwordField = document.querySelector(`${form} #password`);
    const confirmPasswordField = document.querySelector(
      `${form} #confirmPassword`
    );

    if (passwordField && confirmPasswordField) {
      let confirmPassErrorElement = document.querySelector(
        ".error-message.confirmPassword"
      );
      if (passwordField.value !== confirmPasswordField.value) {
        isPassword = true;
        confirmPassErrorElement.innerHTML = "Mật khẩu không trùng khớp";
      } else {
        isPassword = false;
        confirmPassErrorElement.innerHTML = "";
      }
    }

    errorArr.push(isFieldError || isPassword);
  }
  if (errorArr.includes(true)) return true;

  return false;
};
