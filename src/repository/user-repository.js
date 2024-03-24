const ValidationError = require("../utils/validation-error");
const { User } = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const ClientError = require("../utils/client-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({ where: { id: userId } });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  async getAllUserSortByPriority() {
    try {
      const users = await User.findAll({order: [['priority', 'ASC']]});
      return users;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }

  async getByPhoneNumber(userPhone_number) {
    try {
      const user = await User.findOne({
        where: { phone_number: userPhone_number },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound", // name of error
          "Invalid email sent in request", // message
          "Please check the email, as there is no record of the email", //explanation
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
