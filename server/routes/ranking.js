const express = require("express");
const rankingRouter = express.Router();
const User = require("../models/User");
const { ensureLoggedIn } = require("connect-ensure-login");

rankingRouter.get("/rating", ensureLoggedIn(), (req, res, next) => {
  User.find()
    .populate({
      path: "createdTrack",
      model: "Tracks"
    })
    .then(users => {
      users.map(user => {
        if (user.createdTrack && user.createdTrack.length) {
          let allRatingsArr = [];
          let ratingArr = user.createdTrack.map(track => {
            if (track) {
              let average =
                track.qualification.reduce((a, b) => {
                  return a + b;
                }) / track.qualification.length;
              allRatingsArr.push(average);
            }
          });
          console.log(allRatingsArr);

          let userAverage =
            allRatingsArr.reduce((a, b) => {
              return a + b;
            }) / allRatingsArr.length;
          let _id = user._id;
          User.findByIdAndUpdate({ _id }, { rating: userAverage })
            .then(res => res.status(200).json(res))
            .catch(err =>
              res
                .status(500)
                .json({ message: "ha habido un problema al guardar el rating" })
            );
        }
      });
    })
    .catch(err => console.log(err));
});

rankingRouter.get("/ranking", (req, res) => {
  User.find()
    .then(response => {
      const sortedUsers = response.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return +1;
        }
        return 0
      });
      
      sortedUsers.map((user, index) => {
        let _id = user._id;
        let position = index + 1;
        User.findByIdAndUpdate({ _id }, { rankingPosition: position })
          .then(() => res.status(200).json(sortedUsers))
          .catch(() =>
            res
              .status(500)
              .json({ message: "Hubo un problema actualizando el ranking" })
          );
      });
    })
    .catch(err => console.log(err));
});
module.exports = rankingRouter;
