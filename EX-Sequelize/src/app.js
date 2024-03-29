const express = require("express");
const morgan = require("morgan");
const path = require("path");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
const indexRouter = require("./routes");
const appRouter = require("./routes/add");

const app = express();

app.set("port", process.env.PORT || 3002);

//View template
app.set("view engine", "html");
nunjucks.configure("src/views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/app", appRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.send(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
