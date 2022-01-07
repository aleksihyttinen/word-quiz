const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

let connectionFuncs = {
  connect: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err) => reject(err));
      resolve("Connected successfully");
    });
  },
  close: () => {
    return new Promise((resolve, reject) => {
      pool.end((err) => reject(err));
      resolve("Connection closed");
    });
  },
  getAll: (language) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id, ${language} AS word FROM words`, (err, words) => {
        if (err) {
          reject(err);
        }
        resolve(words);
      });
    });
  },
  postWord: (word) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO words (english, finnish, swedish) VALUES (?,?,?)`,
        word,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  deleteWord: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM words WHERE words.id = ?`, id, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.affectedRows == 0) {
          reject("Id not found");
        } else {
          resolve(`Deleted id: ${id} successfully`);
        }
      });
    });
  },
};
module.exports = connectionFuncs;
