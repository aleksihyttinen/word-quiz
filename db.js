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
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM words`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  getByLanguage: (language) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id, ${language} AS word FROM words`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
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
          resolve(result.insertId);
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
  getById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM words WHERE words.id = ?`,
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.affectedRows == 0) {
            reject("Id not found");
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  editWord: (id, word) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE words SET english = ?, finnish = ?, swedish = ? WHERE words.id = ${id}`,
        word,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
module.exports = connectionFuncs;
