const userRepository = require("../repositories/userRepository");

class UserService {
  async registerUser(username, email, password, phoneNumber) {
    try {
      return await userRepository.registerUser(
        username,
        email,
        password,
        phoneNumber
      );
    } catch (error) {
      return { error: error.message };
    }
  }

  async loginUser(email, password) {
    try {
      return await userRepository.loginUser(email, password);
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUser(token) {
    try {
      return await userRepository.getUser(token);
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new UserService();
