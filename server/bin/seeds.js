require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Restaurants = require("../models/Restaurants");
//  const Routes = require("../models/Routes");



mongoose
.connect(process.env.DBURL, {useMongoClient: true})
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: `
    );
    return User.collection.drop();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let restaurants = [
  {
    restaurantName: "Burrito",
    category: "burguers",
    restaurantPhoto: null,
    rating: "4",
    review_count: 500,
    price: "$$",
    phone: "7877623476",
    url: null,

    address: {
      lat: null,
      lng: null
    },

    location: {
      city: null,
      country: null,
      address: null,
      zip_code: null
    }
  }
];

let user = [
  {
    username: "test",
    password: "123",
    pictureUrl: null,
    email: "test@test.com",
    city: "Madrid",
    // routes: [{ type: Routes.Types.ObjectId, ref: "Routes" }]
  }
];



User.deleteMany()
  .then(() => {
    return User.create(user);
  })
  .then(() => {
    return Restaurants.create(restaurants);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
