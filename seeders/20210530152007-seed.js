const bcrypt = require("bcrypt")
const { Faker } = require('fakergem')
const { Menu, Vote, Dish, MenuDish } = require('../models')

module.exports = {
  up: async () => {
    await Menu.destroy({ truncate: true })
    await Vote.destroy({ truncate: true })
    await Dish.destroy({ truncate: true })
    await MenuDish.destroy({ truncate: true })

    const menu = await Menu.create({
      name: `Menu 1`,
      Dishes: [
        {
          name: Faker.Food.ingredient(),
          type: 'Appetizer'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Appetizer'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Appetizer'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Main'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Main'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Main'
        },         {
          name: Faker.Food.ingredient(),
          type: 'Dessert'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Dessert'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Dessert'
        },        {
          name: Faker.Food.ingredient(),
          type: 'Drink'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Drink'
        }, {
          name: Faker.Food.ingredient(),
          type: 'Drink'
        }
      ]
    }, {
      include: Menu.Dishes
    })

    const Dishes = await Dish.findAll()

    for (let i = 0; i < 200; i++) {
      const randomDishIndex = Faker.Number.between(0, 11)
      await Vote.create({
        MenuId: menu.id,
        DishId: Dishes[randomDishIndex].id
      })
    }
  },
}
