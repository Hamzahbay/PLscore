const mongoose = require("mongoose");

const fixSchema = new mongoose.Schema({
  data: Array,
});

const Fixtures = mongoose.model("Fix", fixSchema);

module.exports = Fixtures;
