const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const UserRepositoryInterface = require("./interfaces/userRepositoryInterface");
const jwtUtils = require("../utils/jwtUtils");
const jwt = require("jsonwebtoken");

class UserRepository extends UserRepositoryInterface {
  async registerUser(username, email, password, phoneNumber) {
    try {
      if (password.length < 6) {
        return {
          success: true,
          message: "Password must be at least 6 characters.",
          data: null,
        };
      }

      const user = await User.findOne({ email: email });
      if (user)
        return { success: true, message: "email already exists", data: null };

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
        phoneNumber,
      });
      await newUser.save();

      // Create a token
      const token = jwtUtils.generateToken({
        id: newUser._id,
        name: newUser.username,
      });

      return { success: true, message: "Sign up Success", data: token };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return { success: false, message: "User does not exixt.", data: null };

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return { success: false, message: "Incorrect Password.", data: null };

      const token = jwtUtils.generateToken({
        id: user._id,
        name: user.username,
      });

      return { success: true, message: "Log in Success", data: token };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  async getUser(token) {
    try {
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decodedToken.id;
      const user = await User.findById(userId);

      if (!user) {
        return { success: false, message: "User not found", data: null };
      }

      return { success: true, message: "success", data: user };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }
}

module.exports = new UserRepository();
