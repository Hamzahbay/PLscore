const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  news: {
    news_value: String,
    writer_id: String,
  },
  user: {
    user_id: String,
    comment: String,
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

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
