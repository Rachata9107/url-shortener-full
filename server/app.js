const createError = require("http-errors");
const redis = require("redis");
const express = require("express");
const sessions = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./routes/libs/dbconfig");
const PORT = process.env.PORT || 3012;

const redisPort = 6379;
const client = redis.createClient(redisPort);
(async () => {
  await client.connect();
})();

// const indexRouter = require("./routes/index");
const usersApiRouter = require("./routes/api/users");
const infoApiRouter = require("./routes/api/info");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/shortener", express.static(path.join(__dirname, "public")));
app.use(
  sessions({
    secret: "my_secret",
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 },
    resave: false,
  })
);

app.use(cors());

// app.use("/", indexRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/info", infoApiRouter);

app.get("/", (req, res) => res.redirect("/shortener"));
app.get("/shortener/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/:urlParams", async (req, res) => {
  const urlParams = req.params.urlParams ?? "";
  const idxUrl = "https://url.rct-dev.com/";
  const sql = `SELECT urlLong FROM t_url_shorte WHERE urlParams=? ;`;
  const urlLong = await client.get(urlParams);
  if (urlLong) {
    res.redirect(urlLong);
  } else {
    const [rows] = await db.execute(sql, [urlParams]);
    console.log(rows);
    if (rows.length > 0) {
      client.set(urlParams, rows[0].urlLong, { EX: 60, NX: true });
      res.redirect(rows.urlLong);
    } else {
      client.set(urlParams, idxUrl, { EX: 60, NX: true });
      res.redirect(idxUrl);
    }
  }
  // db.execute(sql, [urlParams])
  // .then(([rows]) => {
  //   if (rows.length > 0) {
  //     res.redirect(rows[0].urlLong);
  //   }
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(PORT, () => {
  console.log(`Server is running. port ${PORT}`);
});

module.exports = app;
