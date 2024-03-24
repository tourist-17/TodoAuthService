const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in service layer");
      throw new AppErrors(
        "ServerError",
        "Something went in service layer",
        "Logical Issue found",
        500
      );
    }
  }
  async signIn(phone_number, plainPassword) {
    try {
      // step 1 -> fetch user using the email
      const user = await this.userRepository.getByPhoneNumber(phone_number);
      // step 2 -> compare incoming plain password with stores ecrypted

      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password does not match ");
        throw { error: "Incorrect password" };
      }
      //   step 3 -> if password match create a token and send it to the user
      const newJWT = this.createToken({
        phone_number: user.phone_number,
        id: user.id,
      });
      return newJWT;
    } catch (error) {
      if (error.name == "AttributeNotFound") {
        throw error;
      }
      console.log("Something went wrong in sign in process");
      throw error;
    }
  }

  async getAllUserSortByPriority() {
    try {
      const users = await this.userRepository.getAllUserSortByPriority();
      return users;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token); //you get => {email: '', id: '', iat: '', exp: ''}
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id); // this check if deleted their account
      if (!user) {
        throw { error: "No user with the corresponding token exist" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went in token validation");
      throw error;
    }
  }
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
