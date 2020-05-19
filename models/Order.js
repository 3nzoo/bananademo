const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  orderID: {
    type: String,
    required: true,
  },
  is_Discounted: {
    type: Boolean,
    default: false,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: String,
  },
  deliveryStatus: {
    type: String,
  },
  deliveryDate: {
    type: String,
  },
  details: [
    {
      jobName: {
        type: String,
        required: true,
      },
      imgLocation: {
        type: String,
        required: true,
      },
      orderDetails: {
        type: String,
        required: true,
      },
      shipDetails: {
        type: String,
        required: true,
      },
    },
  ],
  is_Paid: {
    type: Boolean,
    default: false,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
