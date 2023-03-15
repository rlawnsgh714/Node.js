const Sequelize = require("sequelize");
const Todo = require("./todo");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.passowrd,
  config
);

db.sequelize = sequelize;

db.Todo = Todo;
Todo.initate(sequelize);

module.exports = db;
