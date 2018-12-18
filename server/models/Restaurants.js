const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
restaurantName: { type: String, required: true },
category:  String,
restaurantPhoto: [ String ],
rating: String,
review_count: Number,

price: String ,
phone: String,
url: String,

coordinates:
{
  latitude: Number,
  longitude: Number
},

location: {
        city: String,
        country: String,
        address: String,
        zip_code: String
      },

// timestamps: {
// createdAt: 'created_at',
// updatedAt: 'updated_at'
// }
});

const Restaurants = mongoose.model('Restaurants', restaurantSchema);
module.exports = Restaurants;