const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const validateAddressInput = require("../../validation/address");
const validatePaymentInput = require("../../validation/payment");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
// DONE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all/client
// @desc    Get all client profiles
// @access  Private
// DONE
router.get(
  "/all/client",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }

    Profile.find()
      .populate("user", ["name", "email", "position", "isApproved"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";

          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }
);

// @route   GET api/profile/all/admin
// @desc    Get all admin profiles
// @access  Private
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
    const profileFields = {};
    User.find({ is_admin: true })
      .select("name")
      .select("position")
      .select("email")
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.user.name;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.telephone) profileFields.telephone = req.body.telephone;
    if (req.body.fax) profileFields.fax = req.body.fax;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.businessType)
      profileFields.businessType = req.body.businessType;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/payment
// @desc    Add payment to profile
// @access  Private
// DONE
router.post(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePaymentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newPayment = {
        cardNum: req.body.cardNum,
        nameCard: req.body.nameCard,
        expiration: req.body.expiration,
        cvCode: req.body.cvCode,
        is_Default: req.body.is_Default
      };

      if (profile.payment.length < 1) {
        newPayment.is_Default = true;
      } else {
        const card = profile.payment
          .map(payload => payload.cardNum)
          .indexOf(req.body.cardNum);
        if (card >= 0) {
          profile.payment.splice(card, 1);
        }

        const checkPay = profile.payment
          .map(item => item.is_Default)
          .indexOf(true);

        if (checkPay >= 0) {
          if (req.body.is_Default == "true") {
            const oldPayment = profile.payment[checkPay];
            profile.payment.splice(checkPay, 1);
            oldPayment.is_Default = false;
            profile.payment.unshift(oldPayment);
          }
        } else {
          if (req.body.is_Default == "false") {
            profile.payment[0].is_Default = true;
          }
        }
      }

      profile.payment.unshift(newPayment);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/payment/:pay_id
// @desc    Delete payment from profile
// @access  Private
// DONE
router.delete(
  "/payment/:pay_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.payment
          .map(item => item.id)
          .indexOf(req.params.pay_id);

        // check payid before Splice out of array
        if (removeIndex >= 0) {
          profile.payment.splice(removeIndex, 1);
        }

        // if payment count is equal to 1
        if (profile.payment.length >= 1) {
          const checkPay = profile.payment
            .map(item => item.is_Default)
            .indexOf(true);
          if (checkPay == -1) {
            profile.payment[0].is_Default = true;
          }
        }

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/address
// @desc    Add address to profile
// @access  Private
//Done
router.post(
  "/address",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddressInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newAdd = {
        name: req.body.name,
        company: req.body.company,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        deliveryAdd: req.body.deliveryAdd,
        billingAdd: req.body.billingAdd
      };

      const checkAdd = profile.address
        .map(item => item.deliveryAdd)
        .indexOf(true);

      if (checkAdd != -1) {
        const oldAdd = profile.address[checkAdd];
        profile.address.splice(checkAdd, 1);
        oldAdd.deliveryAdd = false;
        profile.address.unshift(oldAdd);
      }

      profile.address.unshift(newAdd);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/address/edit
// @desc    edit address to profile
// @access  Private

router.post(
  "/address/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddressInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newAdd = {
        name: req.body.name,
        company: req.body.company,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        deliveryAdd: req.body.deliveryAdd,
        billingAdd: req.body.billingAdd
      };

      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));

      const checkAdd = profile.address
        .map(item => item.deliveryAdd)
        .indexOf(true);

      if (checkAdd != -1) {
        const oldAdd = profile.address[checkAdd];
        profile.address.splice(checkAdd, 1);
        oldAdd.deliveryAdd = false;
        profile.address.unshift(oldAdd);
      }

      profile.address.unshift(newAdd);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/address/:add_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.address
          .map(item => item.id)
          .indexOf(req.params.add_id);

        // check add_id before Splice out of array
        if (removeIndex >= 0) {
          profile.address.splice(removeIndex, 1);
        }

        // if payment count is equal to 1
        if (profile.address.length >= 1) {
          const checkAdd = profile.address
            .map(item => item.deliveryAdd)
            .indexOf(true);

          if (checkPay == -1) {
            profile.address[0].deliveryAdd = true;
          }
        }

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.is_admin) {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: "Account Deleted" })
        );
      });
    } else {
      res.json({ fail: "Admin Account cannot be deleted" });
    }
  }
);

// @route   DELETE api/profile/admin
// @desc    Delete user and profile by admin
// @access  Private
router.delete(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (req.user.is_admin && req.user.position == "admin" && user) {
        if (req.user.email != req.body.email && req.user.position == "admin") {
          Profile.findOneAndRemove({ handle: req.body.handle }).then(() => {
            User.findOneAndRemove({ email: req.body.email }).then(() =>
              res.json({ success: "account Deleted" })
            );
          });
        } else {
          res.json({ fail: "Admin account cannot be deleted" });
        }
      } else {
        res.json({
          error: "Use only Admin account"
        });
      }
    });
  }
);

module.exports = router;
