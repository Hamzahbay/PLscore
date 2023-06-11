const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
  data: Array,
});

const Players = mongoose.model("Player", playersSchema);

module.exports = Players;
