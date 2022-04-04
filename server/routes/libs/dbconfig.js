const mysql = require("mysql2");

const db = mysql
  .createPool({
    host: "wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "abx5g4n1gxybee10",
    password: "ujqfemuochx05puy",
    port: 3306,
    database: "xugi1nji2qy8muzr",
  })
  .promise();

module.exports = db;
