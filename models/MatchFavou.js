const mongoose = require("mongoose");

const favouSchema = new mongoose.Schema({
  match_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const FavouMatch = mongoose.model("FavouMatch", favouSchema);

module.exports = FavouMatch;
