const express = require("express");
const passport = require("passport");
const profileRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks")

profileRouter.get("/", ensureLoggedIn(), (req, res, next) => {

    Track.findById(req.track._id)
      .populate('creatorID')
      .then((user) => {
        res.status(200).json({ user })
        console.log(user)
      })
      .catch(err => console.log(err));
  });
  
profileRouter.post("/details", ensureLoggedIn(), (req, res, next) => {
  console.log("/////////////////////////////////////////////////////////////////////////////")
  console.log(req.body.username)
  console.log(req.file.url)
  const { _id } = req.user;
  let { username, email } = req.body;
  const imgPath = req.file.url;
  if ( username === "" ) username = req.user.username;
  if ( email === "" ) email = req.user.email;


  User.findByIdAndUpdate(
    { _id },
    { $set: { username, email, imgPath } } // , imgPath
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
