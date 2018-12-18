const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurants = require("./Restaurants");
// const Tracks = require("./Tracks");


const TracksSchema = new Schema({
routesName: { type: String, required: true},
category:  String,
routesType : String, enum : ["created", "shared", "public", "private"],
routesPhoto: { type: String },
date: {type: String},
image: String,
// restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurants'}],
creatorID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
timestamps: {
createdAt: 'created_at',
updatedAt: 'updated_at'
}
});

const Tracks = mongoose.model('Tracks', TracksSchema);
module.exports = Tracks;