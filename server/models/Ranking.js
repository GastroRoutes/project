const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankingSchema = new Schema({
    user: [{ type : Schema.Types.ObjectId, ref: "User" }],
})

const Ranking = mongoose.model("Ranking", RankingSchema);
module.exports = Ranking;