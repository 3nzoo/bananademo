const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  position: {
    type: String
  },
  handle: {
    type: String
  },
  company: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  fax: {
    type: String
  },
  website: {
    type: String
  },
  businessType: {
    type: String
  },
  isRequesting: {
    type: Boolean,
    default: false
  },
  docs: [
    {
      title: {
        type: String,
        required: true
      },
      newFileName: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  address: [
    {
      name: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      streetAddress: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      deliveryAdd: {
        type: Boolean,
        default: false
      },
      billingAdd: {
        type: Boolean,
        default: false
      }
    }
  ],
  payment: [
    {
      cardNum: {
        type: String,
        required: true
      },
      nameCard: {
        type: String,
        required: true
      },
      expiration: {
        type: String,
        required: true
      },
      cvCode: {
        type: String,
        required: true
      },
      is_Default: {
        type: Boolean,
        default: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
