'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuDish extends Model {
    static associate(models) {
      MenuDish.Menu = this.belongsTo(models.Menu)
      MenuDish.Dish = this.belongsTo(models.Dish)
    }
  };
  MenuDish.init({
    MenuId: DataTypes.INTEGER,
    DishId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuDish',
  });
  return MenuDish;
};
