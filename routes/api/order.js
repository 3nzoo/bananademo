const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

const validateOrdersInput = require("../../validation/order");

const Profile = require("../../models/Profile");

const Order = require("../../models/Order");

router.get("/test", (req, res) => res.json({ msg: "Orders Works" }));

// @route   GET api/order/all
// @desc    Get all order by owner
// @access  Private Client
// DONE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Order.find({ user: req.user.id })
      .then((order) => {
        if (!order) {
          errors.noorder = "You haven't ordered yet.";
          return res.status(404).json(errors);
        }
        res.json(order);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/order/new
// @desc    Get new orders by admin
// @access  Private Admin
// DONE
router.get(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }
    Order.find({ opened: false })
      .then((order) => {
        if (!order || order.length === 0) {
          errors.noorder = "No new orders yet";
          return res.status(404).json(errors);
        }

        res.json(order);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/order/new
// @desc    Get new orders by admin
// @access  Private Admin
// DONE
router.get(
  "/all/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }

    Order.find()
      .then((order) => {
        if (!order || order.length === 0) {
          errors.noorder = "No orders yet";
          return res.status(404).json(errors);
        }

        res.json(order);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/order/
// @desc    Create new orders by client
// @access  Private Cl
// DONE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const jobsCount = req.body.jobName.length;

    Order.countDocuments({ user: req.user.id }).then((order) => {
      const x = order + 1;
      const orderFields = {};
      req.body.orderID = "000" + x;
      orderFields.orderID = req.body.orderID + req.user.name;

      // Check Validation
      const { errors, isValid } = validateOrdersInput(req.body);

      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      orderFields.user = req.user.id;

      if (req.user.position === "premiere") {
        orderFields.is_Discounted = false;
      }
      if (req.body.totalAmount) orderFields.totalAmount = req.body.totalAmount;
      if (req.body.billingAddress)
        orderFields.billingAddress = req.body.billingAddress;
      if (req.body.deliveryDate) {
        orderFields.deliveryDate = req.body.deliveryDate;
      }

      orderFields.details = [];

      for (i = 0; i < jobsCount; i++) {
        const newDetail = {
          jobName: req.body.jobName[i],
          imgLocation: req.body.imgLocation[i],
          orderDetails: req.body.orderDetails[i],
          shipDetails: req.body.shipDetails[i],
        };
        orderFields.details.push(newDetail);
      }

      // Save Order
      new Order(orderFields).save().then((order) => res.json(order));
    });
  }
);

// @route   Post api/order/deliStat/:id
// @desc    update delivery status by admin
// @access  Private Admin
// DONE
router.post(
  "/deliStat/:or_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }
    Order.findOneAndUpdate(
      { _id: req.params.or_id },
      { deliveryStatus: req.body.deliveryStat },
      { new: true }
    ).then((x) => {
      Order.findOneAndUpdate(
        { _id: req.params.or_id },
        { lastModified: Date(Date.now()) },
        { new: true }
      ).then((item) => {
        res.json({ status: req.body.deliveryStat });
      });
    });
  }
);

// @route   Post api/order/open
// @desc    opens order by admin
// @access  Private Admin
// DONE
router.post(
  "/open/:or_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }
    Order.findOneAndUpdate(
      { _id: req.params.or_id },
      { opened: true },
      { new: true }
    ).then((x) => {
      Order.findOneAndUpdate(
        { _id: req.params.or_id },
        { lastModified: Date(Date.now()) },
        { new: true }
      ).then((item) => console.log("opened"));
    });
  }
);

// @route   Post api/order/paid/:id
// @desc    update paid by client
// @access  Private Client
// DONE
router.post(
  "/paid/:or_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Order.findOne({ _id: req.params.or_id }).then((order) => {
      if (req.user.id != order.user) {
        errors.access = "Unauthorized";
        return res.status(400).json(errors);
      }
      Order.findOneAndUpdate(
        { _id: req.params.or_id },
        { is_Paid: true },
        { new: true }
      ).then((x) => {
        Order.findOneAndUpdate(
          { _id: req.params.or_id },
          { lastModified: Date(Date.now()) },
          { new: true }
        ).then((item) => {
          res.json({ task: "paid" });
        });
      });
    });
  }
);

// @route   Post api/order/deliDate/:id
// @desc    update delivery date by client
// @access  Private Client
// DONE
router.post(
  "/deliDate/:or_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Order.findOne({ _id: req.params.or_id }).then((order) => {
      if (req.user.id != order.user) {
        errors.access = "Unauthorized";
        return res.status(400).json(errors);
      }
      Order.findOneAndUpdate(
        { _id: req.params.or_id },
        { deliveryDate: req.body.newDate },
        { new: true }
      ).then((x) => {
        Order.findOneAndUpdate(
          { _id: req.params.or_id },
          { lastModified: Date(Date.now()) },
          { new: true }
        ).then((item) => {
          res.json({ newDate: req.body.newDate });
        });
      });
    });
  }
);

// @route   DELETE api/order/admin
// @desc    Delete order by admin
// @access  Private Admin
router.delete(
  "/admin/:or_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.is_admin && req.user.position == "admin") {
      if (req.user.email != req.body.email && req.user.position == "admin") {
        Order.findOneAndRemove({ _id: req.params.or_id }).then(() => {
          res.json({ done: "Order Deleted" });
        });
      } else {
        res.json({ fail: "Order cannot be deleted" });
      }
    } else {
      res.json({
        error: "Use only Admin account",
      });
    }
  }
);

module.exports = router;
