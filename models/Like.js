const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  news: {
    news_value: String,
    writer_id: String,
  },
  user: {
    user_id: String,
    like: Boolean,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
