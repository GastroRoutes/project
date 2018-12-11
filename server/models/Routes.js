const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurants = require("../models/Restaurants");
const Routes = require("../models/Routes");


const routesSchema = new Schema({
routesName: { type: String, required: true},
category:  String,
routesType : String, enum : ["created", "shared", "public", "private"],
routesPhoto: { type: String },
restaurants: [{type: Restaurants.Types.ObjectId, ref: 'Restaurants'}],
creatorID: { type: User.Types.ObjectId, ref: 'User' },
},
{
timestamps: {
createdAt: 'created_at',
updatedAt: 'updated_at'
}
});

const Routes = mongoose.model('Routes', routesSchema);
module.exports = Routes;