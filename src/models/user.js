"use strict";
const { Model } = require("sequelize");
const { SALT } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "User_Roles",
      });
    }
  }
  User.init(
    {
      phone_number: { type: DataTypes.STRING, allowNull: false },
      priority: { type: DataTypes.INTEGER, defaultValue: 2 },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 100] },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
    User.beforeCreate((user) => {
      const encryptedPassword = bcrypt.hashSync(user.password, SALT);
      user.password = encryptedPassword;
    });
  return User;
};
