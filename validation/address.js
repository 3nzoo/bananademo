const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddressInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.streeAddress = !isEmpty(data.streeAddress) ? data.streeAddress : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
  data.deliveryAdd = !isEmpty(data.deliveryAdd) ? data.deliveryAdd : false;
  data.billingAdd = !isEmpty(data.billingAdd) ? data.billingAdd : false;

  if (Validator.isEmpty(data.name)) {
    errors.title = "Name or Contact person is required";
  }

  if (Validator.isEmpty(data.streetAddress)) {
    errors.title = "Street Address is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.company = "City is required";
  }

  if (Validator.isEmpty(data.state)) {
    errors.title = "Please Choose which State are you from";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.title = "Zip Code is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
