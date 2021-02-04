'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post}) {
      // define association here
      this.hasMany(post, { foreignKey : 'id'})
    }
    toJSON(){
      return {...this.get(), isAdmin: undefined, isBlocked: undefined, password: undefined}
    }
  };
  user.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    login: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull: {msg: "user must have a login"},   
        notEmpty:  {msg: "login must not be empty"},
        min: {
          args: 3,
          msg: "login must be more then 3"
        }
      }
    },
    nickname:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: "nickname"
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: 0
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'user',
  });

  return user;
};