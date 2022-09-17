const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrderDetailsInput(data) {
  let errors = {};

  data.imgLocation = !isEmpty(data.imgLocation) ? data.imgLocation : "";
  data.jobName = !isEmpty(data.jobName) ? data.jobName : "";
  data.orderDetails = !isEmpty(data.orderDetails) ? data.orderDetails : "";
  data.shipDetails = !isEmpty(data.shipDetails) ? data.shipDetails : "";

  if (data.jobName.length <= 0) {
    errors.jobName = "Job Name is required";
  }

  if (data.imgLocation.length <= 0) {
    errors.imgLocation = "Image is required";
  }

  if (data.orderDetails.length <= 0) {
    errors.orderDetails = "no order found";
  }

  if (data.shipDetails.length <= 0) {
    errors.shipDetails = "Shipping is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
