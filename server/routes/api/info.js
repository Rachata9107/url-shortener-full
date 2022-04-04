const express = require("express");
const router = express.Router();
const db = require("../libs/dbconfig");
const makeid = require("../libs/url-generate");

router.get("/url-shorte", (req, res) => {
  const user = req.query.user ?? "";
  let sql = "SELECT*FROM t_url_shorte";
  sql += user ? " WHERE user=? ORDER BY id DESC;" : " ORDER BY id DESC;";
  db.execute(sql, [user])
    .then(([rows]) => {
      if (rows.length > 0) {
        res.send({ massage: "Normal", results: rows, state: true });
      } else {
        res.send({ massage: "No Data.", results: [], state: false });
      }
    })
    .catch((err) => {
      res.send({ massage: "Error.", results: [], state: false, ...err });
    });
});

router.post("/url-shorte", (req, res) => {
  const { user, urlLong, urlTitle } = req.body;
  const urlParams = makeid(7);
  const urlShorte = `http://127.0.0.1:3001/${urlParams}`;
  const sql = `INSERT INTO t_url_shorte (user, title, urlLong, urlShorte, urlParams, datetime) VALUES ( ?, ?, ?, ?, ?, NOW());`;
  db.execute(sql, [user, urlTitle, urlLong, urlShorte, urlParams])
    .then(() => {
      res.send({ massage: "Insert Successfully.", state: true });
    })
    .catch((err) => {
      res.send({ massage: "Insert Failed.", state: false, ...err });
    });
});

router.put("/url-shorte", (req, res) => {
  const { id } = req.query;
  const { urlLong } = req.body;
  const sql = "UPDATE t_url_shorte SET urlLong=? WHERE id=? ;";
  db.execute(sql, [urlLong, id])
    .then(() => {
      res.send({ massage: "Update Successfully.", state: true });
    })
    .catch((err) => {
      res.send({ massage: "Update Failed.", state: false, ...err });
    });
});

router.delete("/url-shorte", (req, res) => {
  const { id } = req.query;
  const sql = "DELETE FROM t_url_shorte WHERE id=? ;";
  db.execute(sql, [id])
    .then(() => {
      res.send({ massage: "Delete Successfully.", state: true });
    })
    .catch((err) => {
      res.send({ massage: "Delete Failed.", state: false, ...err });
    });
});

module.exports = router;
