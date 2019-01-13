const express = require("express");
const trackRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn } = require("connect-ensure-login");
const Track = require("../models/Tracks");
const Restaurants = require("../models/Restaurants");

trackRouter.get("/", ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id)
    //.populate("createdTrack")
    .populate({
      path: "createdTrack",
      model: "Tracks",
      populate: {
        path: "restaurants",
        model: "Restaurants"
      }
    })
    .populate({
      path: "savedRoutes",
      model: "Tracks",
      populate: {
        path: "restaurants",
        model: "Restaurants"
      }
    })
    .populate({
      path: "creatorID",
      model: "Tracks"
    })
    // .populate("savedRoutes")
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
    const {
      routesName,
      category,
      selectedRestaurants,
      date,
      hour,
      duration
    } = req.body;
    let image = "";
    if (req.file) {
      image = req.file.url;
    } else {
      image = req.user.imgPath;
    }

    let totalRestaurants = JSON.parse(selectedRestaurants);

    let restaurantsArray = totalRestaurants.map(restaurant => {
      return {
        restaurantName: restaurant.name,
        categories: restaurant.categories[0].alias,
        restaurantPhoto: restaurant.restaurantPhoto,
        rating: restaurant.rating,
        review_count: restaurant.review_count,
        price: restaurant.price,
        phone: restaurant.phone,
        url: restaurant.url,
        coordinates: {
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude
        },
        location: {
          city: restaurant.location.city,
          country: restaurant.location.country,
          address: restaurant.location.address,
          zip_code: restaurant.location.zip_code
        }
      };
    });

    Restaurants.insertMany(restaurantsArray, (err, insertedRestuants) => {
      let arrayOfIds = insertedRestuants.map(restaurant => {
        return restaurant._id;
      });

      const newTrack = new Track({
        routesName: routesName,
        category: category,
        date: date,
        hour: hour,
        duration: duration,
        image: image,
        restaurants: arrayOfIds,
        creatorID: [_id]
      });

      newTrack.save().then(track => {
        User.findByIdAndUpdate(_id, {
          $addToSet: { createdTrack: track._id }
        }).then(user => {
          res.status(200).json({ track, user });
          // }
          // );
        });
      });
    });
  }
);

trackRouter.post("/:id/delete", (req, res, next) => {
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
  Track.find()
    .populate("creatorID")
    .populate("restaurants")
    .then(track => track)
    .catch(err => console.log(err))
    .then(track => {
      User.find()
        .populate("savedRoutes")
        .then(user => {
          res.status(200).json({ track, savedRoutes: user.savedRoutes });
        });
    });
});

trackRouter.post("/:id/followRoutes", (req, res, next) => {
  const routeID = req.params.id;
  const _id = req.user.id;

  User.findByIdAndUpdate({ _id }, { $addToSet: { savedRoutes: routeID } })
    .populate("savedRoutes")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

trackRouter.post("/qualification", (req, res) => {

  const { rating, _id} = req.body;
  Track.findByIdAndUpdate(
    { _id },
    { $push: { qualification: rating } }
  )
    .then(track => res.status(200).json({ message: track }))
    .catch(e => res.status(200).json({ message: e.message}));
});
module.exports = trackRouter;
