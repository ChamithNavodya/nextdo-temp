const userService = require("../services/userService");
const { checkMissingFields } = require("../utils/checkMissingFields");

class UserController {
  async registerUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const requiredFields = ["username", "email", "password", "phoneNumber"];
      const missingFieldsResponse = checkMissingFields(
        req,
        res,
        requiredFields
      );

      if (missingFieldsResponse) {
        return missingFieldsResponse;
      }

      const result = await userService.registerUser(
        username,
        email,
        password,
        phoneNumber
      );

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message,
          data: result.data,
        });
      }

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const missingFields = [];
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");
      const missingFieldsResponse = checkMissingFields(req, res, missingFields);

      if (missingFieldsResponse) {
        return missingFieldsResponse;
      }

      const result = await userService.loginUser(email, password);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message,
          data: result.data,
        });
      }

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Token not provided",
          data: null,
        });
      }

      const result = await userService.getUser(token);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message,
          data: result.data,
        });
      }

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
