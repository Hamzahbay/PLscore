const mongoose = require("mongoose");

const viewsSchema = mongoose.Schema({
  actor: {
    actor_role: {
      type: String,
      required: true,
    },
    actor_name: {
      type: String,
      required: true,
    },
    actor_id: {
      type: String,
      required: true,
    },
  },
  news: {
    news_value: {
      type: String,
      required: true,
    },
    writer_id: {
      type: String,
      required: true,
    },
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

const Views = mongoose.model("View", viewsSchema);

module.exports = Views;
