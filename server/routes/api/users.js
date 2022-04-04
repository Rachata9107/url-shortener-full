const express = require("express");
const router = express.Router();
const bcrypy = require("bcrypt");
const db = require("../libs/dbconfig");

router.get("/all", (req, res) => {
  const sql = "SELECT id, user, email, level, datetime FROM t_users ;";
  db.query(sql)
    .then(([rows]) => {
      res.send({ massage: "Users total.", results: rows, state: true });
    })
    .catch((err) => {
      res.send({ massage: "error", state: false, ...err });
    });
});

router.post("/chk-user", (req, res) => {
  const { userName, userEmail } = req.body;
  const sql = "SELECT*FROM t_users WHERE user=? OR email=? ;";
  db.execute(sql, [userName, userEmail])
    .then(([rows]) => {
      let msg = "";
      if (rows.length > 0) {
        if (userName == rows[0].user) msg = "This user cannot be accessed.";
        if (userEmail == rows[0].email) msg = "This e-mail cannot be accessed.";
        if (userName == rows[0].user && userEmail == rows[0].email)
          msg = "This user and e-mail cannot be accessed.";
      }
      res.send({
        massage: msg,
        state: rows.length < 1 ? true : false,
      });
    })
    .catch((err) => {
      res.send({ massage: "error", state: false, ...err });
    });
});

router.post("/add-user", (req, res) => {
  const { userName, userEmail, userPassword, userLevel } = req.body;
  const passHash = bcrypy.hashSync(userPassword, 10);
  const level = userLevel === "admin" ? "admin" : "user";
  const sql =
    "INSERT INTO t_users (user, password, email, level, datetime) VALUES(?, ?, ?, ?, NOW()) ;";
  db.execute(sql, [userName, passHash, userEmail, level])
    .then(() => {
      res.send({ massage: "Add user successfully.", state: true });
    })
    .catch((err) => {
      res.send({ massage: "error", state: false, ...err });
    });
});

router.post("/login", (req, res) => {
  const session = req.session;
  const { userName, userPassword } = req.body;
  const sql = "SELECT*FROM t_users WHERE user=? OR email=? ;";
  db.execute(sql, [userName, userName])
    .then(([rows]) => {
      if (rows.length > 0) {
        const chkPassword = bcrypy.compareSync(userPassword, rows[0].password);
        if (chkPassword) {
          session.user = rows[0].user;
          session.level = rows[0].level;
          res.send({
            massage: "Login successfully.",
            level: rows[0].level,
            state: true,
          });
        } else {
          res.send({ massage: "Login failed.", state: false });
        }
      } else {
        res.send({ massage: "user or email not found.", state: false });
      }
    })
    .catch((err) => {
      if (err) throw err;
      res.send({ massage: "error", state: false });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ massage: "Logout", state: true });
});

router.get("/chk-session", (req, res) => {
  const session = req.session;
  const userName = session.user ?? "";
  const userLevel = session.level ?? "";
  if (userName) {
    res.send({ user: userName, level: userLevel, state: true });
  } else {
    res.send({ user: userName, level: userLevel, state: false });
  }
});

router.delete("/delete-user", (req, res) => {
  const { id } = req.query;
  const sql = "DELETE FROM t_users WHERE id=? ;";
  db.execute(sql, [id])
    .then(() => {
      res.send({ massage: "User deleted.", state: true });
    })
    .catch((err) => {
      res.send({ massage: "error", state: false });
      console.error(err);
    });
});

module.exports = router;
