const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  dateCreate: {
    type: String,
    required: true,
  },
  timeCreate: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  imgThumbnail: {
    type: String,
    default: "./img/default.png",
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  writer_id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("New", newsSchema);

module.exports = News;
