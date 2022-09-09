const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  //Create a connection pool
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

let connectionFuncs = {
  connect: () => {
    //Get a connection from the pool (unused)
    return new Promise((resolve, reject) => {
      pool.getConnection((err) => reject(err));
      resolve("Connected successfully");
    });
  },
  close: () => {
    //Closes a connection from the pool (unused)
    return new Promise((resolve, reject) => {
      pool.end((err) => reject(err));
      resolve("Connection closed");
    });
  },
  getCategories: () => {
    //Selects all table names (categories) from database
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'dbqmalhy2' AND table_name != 'users';`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  getByCategory: (category) => {
    //Selects all words from a category
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
    //Selects all words in a single language
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
    //Inserts a new word to a category
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
    //Deletes a word from a category
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM ${category} WHERE ${category}.id = ?`,
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
    //Gets a word from category by word id
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM ${category} WHERE ${category}.id = ?`,
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
    //Updates a word in a category by id
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE ${category} SET english = ?, finnish = ?, swedish = ? WHERE ${category}.id = ${id}`,
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
