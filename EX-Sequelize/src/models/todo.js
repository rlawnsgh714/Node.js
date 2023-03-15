const Sequelize = require("sequelize");

class Todo extends Sequelize.Model {
  static initate(sequelize) {
    Todo.init(
      {
        job: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        done: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Todo",
        tableName: "todos",
        underscored: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
}

module.exports = Todo;
