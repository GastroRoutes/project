const express = require("express");
const trackRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks");

trackRouter.get("/", ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id)
    .populate("createdTrack")
    .populate('savedRoutes')
    .then(track => {
      // console.log(req.user)
      res.status(200).json({ track });
    })
    .catch(err => console.log(err));
});

trackRouter.post(
  "/createTrack",
  [ensureLoggedIn(), uploadCloud.single("photo")],
  (req, res, next) => {
    const { _id } = req.user;
    const { routesName, category, routesType } = req.body;
    const image = req.file.url;
    const newTrack = new Track({
      routesName: routesName,
      category: category,
      routesType: routesType,
      image: image

      // restaurants,        /// recordad meterlo en la constante
    });

    newTrack.save().then(track => {
      User.findByIdAndUpdate(_id, { createdTrack: track._id })
      // console.log(track)
      .then(user => user)
      .then((user)=>{
        Track.findById({_id:track._id},{user:user._id} )
        .then(()=>res.status(200).json({track,user}))
      })
    });
  }
);

trackRouter.post("/:id/delete", (req, res, next) => {
  console.log("Estoy en delete, en back");
  Track.findByIdAndRemove(req.params.id)
    .then(track => res.status(200).json(track))
    .catch(error => next(error));
});

trackRouter.post("/:id/update", (req, res, next) => {
  let { routesName, category, routesType, routesPhoto, creatorID } = req.body;

  if (routesName === "" || routesName === undefined)
    routesName = req.Track.routesName;
  if (category === "" || category === undefined) category = req.Track.category;
  if (routesType === "" || routesType === undefined)
    routesType = req.Track.routesType;
  // if (routesPhoto === "") place = req.Track.routesPhoto;
  if (creatorID === "") creatorID = req.Track.creatorID;

  const { id } = req.params;

  Track.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        routesName,
        category,
        routesType
      }
    }
  )
    .then(track => {
      res.status(200).json(track);
    })
    .catch(err => console.log(err));
});

trackRouter.get("/allRoutes", ensureLoggedIn(), (req, res, next) => {
  console.log("//////////////////////////////////////////    GET ALL ROUTES");
  // Promise.all()
  Track.find()
    .then(track => track)
    .catch(err => console.log(err))
    .then(track => {
      User.find()
        .populate("savedRoutes")
        .then(user => {
          console.log(user,track)
          res.status(200).json({ track, savedRoutes: user.savedRoutes });
        });
    });
});

// trackRouter.get('/allRoutes', ensureLoggedIn(), (req,res,next)=>{
//     User.find()
//     .populate('savedRoutes')
//     .then(track => res.status(200).json( {track}))
//   })
trackRouter.post("/:id/followRoutes", (req, res, next) => {
  const routeID = req.params.id;
  const _id = req.user.id;
  console.log(routeID);
  console.log(_id);

  User.findByIdAndUpdate({ _id }, { $push: { savedRoutes: routeID } })
  .populate('savedRoutes')
    .then((user) => {
      console.log();
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = trackRouter;
