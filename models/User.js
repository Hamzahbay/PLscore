const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 12,
  },
  email: {
    type: String,
    required: true,
  },
  favourite: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
