const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
// DONE
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        is_admin: false,
        position: "premiere"
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/register/admin
// @desc    Register admin user
// @access  Private
// DONE
router.post(
  "/register/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else if (!req.user.is_admin) {
        errors.access = "Unauthorized";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          is_admin: req.body.is_admin,
          position: req.body.position
        });
        if (newUser.position == "professional") {
          newUser.isApproved = true;
          newUser.is_admin = false;
        } else if (newUser.position == "premiere") {
          newUser.is_admin = false;
        } else {
          newUser.is_admin = true;
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// @route   POST api/users/register/approve
// @desc    Approve user by admin
// @access  Private
// Done
router.post(
  "/approve/pro",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        errors.email = "user not found";
        return res.status(400).json(errors);
      } else if (req.user.is_admin && user.position != "admin") {
        //client position cant be admin
        //req.user should be admin (true)
        User.findOneAndUpdate(
          { email: user.email },
          { position: "professional" },
          { new: true }
        ).then(user => res.json(user));
      } else {
        errors = "Page not found";
        return res.status(400).json(errors);
      }
    });
  }
);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          is_admin: user.is_admin,
          position: user.position
        }; // Create JWT Payload
        if (user.is_admin || user.isApproved) {
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                approved: user.isApproved,
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.isApproved = "Account is not yet Approved";
          return res.status(400).json(errors);
        }
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   POST api/users/register/approve
// @desc    Approve user by admin
// @access  Private
// Done
router.post(
  "/approve",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        errors.email = "user not found";
        return res.status(400).json(errors);
      } else if (req.user.is_admin && user.position != "admin") {
        //client position cant be admin
        //req.user should be admin (true)
        User.findOneAndUpdate(
          { email: user.email },
          { isApproved: true },
          { new: true }
        ).then(user => res.json(user));
      } else {
        errors = "Page not found";
        return res.status(400).json(errors);
      }
    });
  }
);

// @route   GET api/users/approve
// @desc    Return unapproved users
// @access  Private
router.get(
  "/unapproved",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!req.user.is_admin) {
      errors.access = "Unauthorized";
      return res.status(400).json(errors);
    }
    User.find({ isApproved: false })
      .select("name")
      .select("email")
      .select("isApproved")
      .then(user => {
        if (!user) {
          errors.nouser = "No user available";
          return res.json(404).json(errors);
        }
        res.json(user);
      })
      .catch(err => res.status(404).json({ user: "No user available" }));
  }
);

module.exports = router;
