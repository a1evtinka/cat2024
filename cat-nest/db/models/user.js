'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event }) {
      this.hasMany(Event, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      profession: {
        type: DataTypes.TEXT,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      gender: {
        type: DataTypes.TEXT,
      },
      country: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.TEXT,
      },
      interests: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
