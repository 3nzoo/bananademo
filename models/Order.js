const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  jobID: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    ref: "user"
  },
  is_Discounted: {
    type: Boolean,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: String
  },
  deliveryStatus: {
    type: String
  },
  deliveryDate: {
    type: String
  },
  imgLocation: {
    type: String
  },
  is_Paid: {
    type: Boolean,
    default: false
  },
  totalAmount: {
    type: String
  },
  orderDetails: {
    type: String
  },
  payment: {
    type: String
  },
  billingAddress: {
    type: String
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
