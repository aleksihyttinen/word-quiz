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
  getCategories: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'dbqmalhy2';`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  getAll: (category) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM ${category}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  getByLanguage: (language, category) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, ${language} AS word FROM ${category}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  postWord: (word, category) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${category} (english, finnish, swedish) VALUES (?,?,?)`,
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
  deleteWord: (id, category) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM ${category} WHERE words.id = ?`,
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.affectedRows == 0) {
            reject("Id not found");
          } else {
            resolve(`Deleted id: ${id} successfully`);
          }
        }
      );
    });
  },
  getById: (id, category) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM ${category} WHERE words.id = ?`,
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
  editWord: (id, word, category) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE ${category} SET english = ?, finnish = ?, swedish = ? WHERE words.id = ${id}`,
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
