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
  close: () => {
    return new Promise((resolve, reject) => {
      connection.end((err) => reject(err));
      resolve("Connection closed");
    });
  },
  getAll: (language) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${language}`, (err, words) => {
        if (err) {
          reject(err);
        }
        resolve(words);
      });
    });
  },
};

module.exports = connectionFuncs;
