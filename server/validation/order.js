const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrdersInput(data) {
  let errors = {};

  data.orderID = !isEmpty(data.orderID) ? data.orderID : "";

  data.lastModified = !isEmpty(data.lastModified) ? data.lastModified : "";
  data.deliveryStatus = !isEmpty(data.deliveryStatus)
    ? data.deliveryStatus
    : "";
  data.deliveryDate = !isEmpty(data.deliveryDate) ? data.deliveryDate : "";
  data.is_Paid = !isEmpty(data.is_Paid) ? data.is_Paid : false;
  data.totalAmount = !isEmpty(data.totalAmount) ? data.totalAmount : "";
  data.is_Discounted = !isEmpty(data.is_Discounted)
    ? data.is_Discounted
    : false;
  data.opened = !isEmpty(data.opened) ? data.opened : "";

  data.jobName = !isEmpty(data.jobName) ? data.jobName : "";
  data.imgLocation = !isEmpty(data.imgLocation) ? data.imgLocation : "";

  data.orderDetails = !isEmpty(data.orderDetails) ? data.orderDetails : "";
  data.shipDetails = !isEmpty(data.shipDetails) ? data.shipDetails : "";

  // data.details = !isEmpty(data.details) ? data.details : "";

  if (Validator.isEmpty(data.orderID)) {
    errors.orderID = " order ID is required";
  }

  if (data.jobName.length <= 0) {
    errors.jobName = "Job Name is required";
  }

  if (Validator.isEmpty(data.totalAmount)) {
    errors.totalAmount = "Total Payment is Required";
  }

  if (Validator.isEmpty(data.deliveryDate)) {
    errors.deliveryDate = "Delivery Date is Required";
  }

  if (Validator.isEmpty(data.billingAddress)) {
    errors.billingAddress = "Billing Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
