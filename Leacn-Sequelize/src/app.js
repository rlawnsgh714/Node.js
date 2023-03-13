const express = require("express");
const moragan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");

const app = express();

// const indexRouter = require("../src/routes");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

dotenv.config();

app.use(moragan("dev"));
app.use("/", express.static(path.join(__dirname, "pubilc")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", indexRouter);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}에서 대기.`);
});
