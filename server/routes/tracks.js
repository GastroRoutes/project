const express = require("express");

const trackRouter = express.Router();
const User = require("../models/User")
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks")


trackRouter.post("/createTrack", ensureLoggedIn(), (req, res, next) => {
    const { _id } = req.user;
  
    const { routesName, category, routesType, routesPhoto, creatorID} = req.body;
  
    const newTrack = new Track({
        routesName: routesName,
        category: category, 
        routesType: routesType,
        routesPhoto: routesPhoto,
        // restaurants,        /// recordad meterlo en la constante
        creatorID: creatorID
    });
  
    newTrack.save()
      .then(track => {
      User.update({ _id }, { $push: { createdTrack: track._id } })
      res.status(200).json(track)
    });
  });
  
  trackRouter.post("/:id/delete", (req, res, next) => {
    Track.findByIdAndRemove(req.params.id)
      .then((track) => res.status(200).json(track)) 
      .catch(error => next(error));
  });
  
  trackRouter.post("/:id/update", (req, res, next) => {
    let {
        routesName, category, routesType, routesPhoto, creatorID
    } = req.body;
  
    if (routesName === "") routesName = req.EventUser.routesName;
    if (category === "") category = req.EventUser.category;
    if (routesType === "") routesType = req.EventUser.routesType;
    // if (routesPhoto === "") place = req.EventUser.routesPhoto;
    if (creatorID === "") creatorID = req.EventUser.creatorID;
  
    const { id } = req.params;
  
    Track.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
            routesName, category, routesType, routesPhoto, creatorID
        }
      }
    )
      .then(track => {
        res.status(200).json(track);
      })
      .catch(err => console.log(err));
  });
  
  module.exports = trackRouter;
  