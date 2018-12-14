const express = require("express");

const trackRouter = express.Router();
const User = require("../models/User")
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks")


trackRouter.get("/", ensureLoggedIn(), (req, res, next) => {

    User.findById(req.user._id)
      .populate('createdTrack')
      .then((track) => {
          console.log(track.createdTrack)
        res.status(200).json({ track })
        console.log(track)
      })
      .catch(err => console.log(err));
  });
  

trackRouter.post("/createTrack", ensureLoggedIn(), (req, res, next) => {
    const { _id } = req.user;
    console.log("Hola desde track")
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
      User.findByIdAndUpdate( _id , { $push: { createdTrack: track._id } })
      .then()
      res.status(200).json(track)
    });
  });
  
  trackRouter.post("/:id/delete", (req, res, next) => {
      console.log("Estoy en delete, en back")
    Track.findByIdAndRemove(req.params.id)
      .then((track) => res.status(200).json(track)) 
      .catch(error => next(error));
  });
  
  trackRouter.post("/:id/update", (req, res, next) => {
    let {
        routesName, category, routesType, routesPhoto, creatorID
    } = req.body;
  
    if (routesName === "") routesName = req.Track.routesName;
    if (category === "") category = req.Track.category;
    if (routesType === "") routesType = req.Track.routesType;
    // if (routesPhoto === "") place = req.Track.routesPhoto;
    if (creatorID === "") creatorID = req.Track.creatorID;
  
    const { id } = req.params;
  
    Track.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
            routesName, category, routesType,
        }
      }
    )
      .then(track => {
        res.status(200).json(track);
      })
      .catch(err => console.log(err));
  });
  
  module.exports = trackRouter;
  