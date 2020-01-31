const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.company = !isEmpty(data.company) ? data.company : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : "";
  data.fax = !isEmpty(data.fax) ? data.fax : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.businessType = !isEmpty(data.businessType) ? data.businessType : "";

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  if (Validator.isEmpty(data.telephone)) {
    errors.company = "Company field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
