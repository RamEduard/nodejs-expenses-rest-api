"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Record, { as: "records" });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
