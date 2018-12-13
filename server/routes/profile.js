const express = require("express");
const passport = require("passport");
const profileRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");


profileRouter.post("/details", ensureLoggedIn(), (req, res, next) => {
  const { _id } = req.user;
  let { username, email } = req.body;
console.log(username)
  if (username === "") username = req.user.username;
  if (email === "") email = req.user.email;

  User.findByIdAndUpdate(
    { _id },
    { $set: { username, email } } // , imgPath
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(err => console.log(err));
});
profileRouter.post(
  "/photo",
  ensureLoggedIn(),
  uploadCloud.single("photo"),
  (req, res, next) => {
    const { _id } = req.user;
    let imgPath = req.file.url;
    User.findByIdAndUpdate(
      { _id },
      { $set: { imgPath } } // , imgPath
    )
      .then(() => {
        res.status(200).json(user);
    })
      .catch(err => console.log(err));
  }
);

module.exports = profileRouter;
