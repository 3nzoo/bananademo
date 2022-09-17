const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

const validateContactInput = require("../../validation/contact");

const Contact = require("../../models/Contact");

router.get("/test", (req, res) => res.json({ msg: "contact works" }));

// @route GET api/contact/all
// @desc Get all messages from contact page
// @access Private Admin
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.is_admin) {
      return res.status(401).json("unauthorized");
    } else {
      Contact.find().then((contacts) => {
        res.json(contacts);
      });
    }
  }
);

// @route GET api/contact/:id
// @desc Get message details by id
// @access Private Admin
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.is_admin) {
      return res.status(401).json({ fail: "unauthorized" });
    } else {
      Contact.findOne({ _id: req.params.id }).then((contact) => {
        res.json(contact);
      });
    }
  }
);

// @route POST api/contact/
// @desc Create new message
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateContactInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    open: false,
  });
  newContact.save().then(() => {
    res.json(newContact);
  });
});

// @route DELETE api/contact/:id
// @desc Delete message using id
// @access Private Admin
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.is_admin) {
      return res.status(401).json({ fail: "unauthorized" });
    } else {
      Contact.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.json({ success: "Message Deleted" });
      });
    }
  }
);
module.exports = router;
