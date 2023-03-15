const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");
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

db.User = User;
User.initiate(sequelize);

db.Comment = Comment;
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
