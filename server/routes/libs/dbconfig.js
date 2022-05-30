const mysql = require("mysql2");

const db = mysql
  .createPool({
    host: "localhost",
    user: "******",
    password: "*******",
    port: 3306,
    database: "url",
  })
  .promise();

module.exports = db;
