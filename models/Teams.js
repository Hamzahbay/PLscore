const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
  teams: Array,
});

const Teams = mongoose.model("Team", teamsSchema);

module.exports = Teams;
