const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters."],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email is exist"],
    validate: {
      validator: function (value) {
        // Email validation using a simple regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  phoneNumber: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
