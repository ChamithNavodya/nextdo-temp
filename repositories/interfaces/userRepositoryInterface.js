class UserRepositoryInterface {
  async registerUser(username, email, password, phoneNumber) {
    throw new Error("Not implemented");
  }

  async loginUser(email, password) {
    throw new Error("Not implemented");
  }

  async getUser(token) {
    throw new Error("Not implemented");
  }
}

module.exports = UserRepositoryInterface;
