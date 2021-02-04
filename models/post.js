'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      // define association here
      this.belongsTo(user, { foreignKey: 'userId'})
    }
    toJSON(){
      return {...this.get()}
    }
  };
  post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'post',
  });
  return post;
};