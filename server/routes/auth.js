const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const uploadCload = require("../config/cloudinary");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).json({message: "Error login 1"}) }
    if (!user) { return res.status(500).json({message: "El usuario no existe"}) }

    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({message: "Error al realizar el login"}) }
      return res.status(200).json(user);
    });
  })(req, res, next);
});


authRoutes.post("/signup", uploadCload.single("photo"), (req, res, next) => {
  const { username, password, email } = req.body;
  // const pictureUrl = req.file.url;

  
  if (username === "" || password === "" || email === "") {
    res.status(500).json({ message: "Todos los campos requeridos" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "El email ya existe" })
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      // pictureUrl
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        req.login(user, (err) => {

          if (err) {
              res.status(500).json({ message: 'Login after signup went bad.' });
              return;
          }

          res.status(200).json(user);
      });
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message: "Logout"});
});

authRoutes.get('/loggedin', (req, res) => {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({message: "Unauthorized"});
  }
})

module.exports = authRoutes;
