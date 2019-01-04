const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks")

usersRouter.get("/:id/users", (req,res)=>{
    console.log(req.params.id)

     User.findById(req.params.id)
     .populate({
        path: "createdTrack",
        model: "Tracks",
        populate: {
          path: "restaurants",
          model: "Restaurants"
        }
      })
     .then(user => res.status(200).json(user))
     .catch(e=>res.status(500).json({message: e}))
})

module.exports = usersRouter