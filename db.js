const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

let connectionFuncs = {
  connect: () => {
    return new Promise((resolve, reject) => {
      connection.getConnection((err) => reject(err));
      resolve("Connected successfully");
    });
  },
};

module.exports = connectionFuncs;
