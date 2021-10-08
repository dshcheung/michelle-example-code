'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    static associate(models) {
      Dish.MenuDishes = this.hasMany(models.MenuDish)
      Dish.Menus = this.belongsToMany(models.Menu, { through: 'MenuDish' })

      Dish.DishVote = this.hasOne(models.Vote)
    }
  };
  Dish.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};
