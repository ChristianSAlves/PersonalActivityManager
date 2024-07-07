const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Todo = sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dataEvento: {
    type: DataTypes.DATE,
    defaultValue: false
  }
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Todo
};
