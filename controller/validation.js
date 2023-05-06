var VALIDATIONS = {
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
};

export const handleValidations = (form) => {
  const myForm = document.querySelector(form);
  const inputs = myForm.querySelectorAll("input");
  const textareas = myForm.querySelectorAll("textarea");

  const errors = myForm.querySelectorAll(".error-message");
  console.log(errors);

  const fields = [...inputs, ...textareas];

  for (let field of fields) {
  }
};
