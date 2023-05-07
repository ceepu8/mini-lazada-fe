const VALIDATE_BY_TYPE = {
  "product-name": ["required", "textOnly"],
  "product-price": ["required", "numberOnly"],
  "product-description": ["required"],
  "product-image": ["required"],
};

const VALIDATIONS = {
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
