"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Record.belongsTo(models.Category, {
        as: "category",
        foreignKey: 'categoryId'
      });
    }
  }
  Record.init(
    {
      amount: DataTypes.FLOAT,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model: 'categories',
          key: 'id'
        }
      },
      date: DataTypes.DATE,
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deleted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "records",
    }
  );
  return Record;
};
