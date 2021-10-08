'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.MenuDishes = this.hasMany(models.MenuDish)
      Menu.Dishes = this.belongsToMany(models.Dish, { through: 'MenuDish' })
    }
  };
  Menu.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};
