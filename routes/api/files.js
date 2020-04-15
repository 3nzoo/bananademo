const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Profile = require("../../models/Profile");

//upload file
router.post(
  "/upload/form",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userName = req.user.email;
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const fil = `${userName.split("@")[0]}!_` + `!${file.name}`;
    file.mv(
      `${__dirname}/../../client/public/uploads/${userName.split("@")[0]}!_` +
        `!${file.name}`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        const newFile = `${userName.split("@")[0]}!_` + `!${file.name}`;
        Profile.findOne({ user: req.user.id })
          .then(profile => {
            const newDocs = {
              title: file.name,
              newFileName: newFile
            };

            if (profile.docs.length < 2) {
              profile.docs.unshift(newDocs);
            } else if (profile.docs.length === 2) {
              profile.docs.splice(0, profile.docs.length);
              profile.docs.unshift(newDocs);
            }
            profile.save().then(item => {});
          })
          .catch(err => {
            console.log(err);
          });

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      }
    );
  }
);

//upload file
router.post(
  "/upload/permit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userName = req.user.email;
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    file.mv(
      `${__dirname}/../../client/public/uploads/${userName.split("@")[0]}!_` +
        `!${file.name}`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        const newFile = `${userName.split("@")[0]}!_` + `!${file.name}`;
        Profile.findOne({ user: req.user.id })
          .then(profile => {
            const newDocspermit = {
              title: file.name,
              newFileName: newFile
            };

            if (profile.docs.length < 2) {
              profile.docs.unshift(newDocspermit);
            } else if (profile.docs.length === 2) {
              profile.docs.splice(0, profile.docs.length);
              profile.docs.unshift(newDocspermit);
            }
            profile.save().then(item => {});
          })
          .catch(err => {
            console.log(err);
          });

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      }
    );
  }
);

//get file
router.get(
  "/download/:fileName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.is_admin) {
      const file = `${__dirname}/../../client/public/uploads/${req.params.fileName}`;
      res.download(file);
    }
  }
);

// router.get(
//   "/filemaster/:filename",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const fileName = req.params.filename;
//     const dom = req.headers.referer.split(":")[1];
//     const port = req.headers.host.split(":")[1];
//     const completeUrl =
//       "http:" + dom + ":" + port + "/api/files/download" + "/" + fileName;

//     res.json({ url: completeUrl });
//   }
// );

module.exports = router;
