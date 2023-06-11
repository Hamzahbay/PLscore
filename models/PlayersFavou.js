const mongoose = require("mongoose");

const favouSchema = new mongoose.Schema({
  player_id: {
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

const FavouPlayers = mongoose.model("FavouPlayer", favouSchema);

module.exports = FavouPlayers;
