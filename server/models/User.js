const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    imgPath:{ type: String, default: "https://profiles.utdallas.edu/img/default.png"},
    // city: String,
    createdTrack: [{ type : Schema.Types.ObjectId, ref: "Tracks", default: [{}] }],
    savedRoutes: [{ type : Schema.Types.ObjectId, ref: "Tracks" }],
    rating: {type: Number},
    rankingPosition: {type: Number, default: 0}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
