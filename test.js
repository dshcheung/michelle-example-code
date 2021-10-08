const { Menu, Dish, sequelize } = require('./models')
const _ = require('lodash')

const getResults = async () => {
  const newestMenu = await Menu.findOne({
    order: [['createdAt', 'DESC']],
  })

  const votesResults = await Dish.findAll({
    raw: true,
    attributes: {
      include: [
        [sequelize.fn('COUNT', sequelize.col('Vote.id')), 'totalVotes']
      ]
    },
    group: ['Dish.id'],
    order: [
      [sequelize.col("totalVotes"), 'Desc']
    ],
    include: {
      association: Dish.DishVote,
      attributes: [],
    }
  })

  console.log(_.groupBy(votesResults, 'type'))
}

// getResults()

const getOptions = async () => {
  const newestMenu = await Menu.findOne({
    // raw: true,
    order: [['createdAt', 'DESC'], ['Dishes', 'type', 'DESC']],
    include: {
      association: Menu.Dishes,
    }
  })

  const formattedMenu = {
    ...newestMenu.toJSON(),
    Dishes: _.groupBy(newestMenu.Dishes, 'type')
  }

  console.log(formattedMenu)
}

getOptions()
