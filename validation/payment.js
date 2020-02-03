const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePaymentInput(data) {
  let errors = {};

  data.cardNum = !isEmpty(data.cardNum) ? data.cardNum : "";
  data.nameCard = !isEmpty(data.nameCard) ? data.nameCard : "";
  data.expiration = !isEmpty(data.expiration) ? data.expiration : "";
  data.cvCode = !isEmpty(data.cvCode) ? data.cvCode : "";
  data.is_Default = !isEmpty(data.is_Default) ? data.is_Default : false;

  if (Validator.isEmpty(data.cardNum)) {
    errors.cardNum = "Card Number is required";
  }

  if (Validator.isEmpty(data.nameCard)) {
    errors.nameCard = "Name on the Credit Card is required";
  }

  if (Validator.isEmpty(data.expiration)) {
    errors.expiration = "Expiration date is required";
  }

  if (Validator.isEmpty(data.cvCode)) {
    errors.cvCode = "CVV code is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
