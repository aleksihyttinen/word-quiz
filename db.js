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
      pool.query(`SELECT * FROM ${language}`, (err, words) => {
        if (err) {
          reject(err);
        }
        resolve(words);
      });
    });
  },
  postWord: (word) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        }
        conn.beginTransaction((err) => {
          if (err) {
            reject(err);
          }

          conn.query(
            `INSERT INTO english (word) VALUES (?)`,
            word[0],
            (err) => {
              if (err) {
                return conn.rollback(() => {
                  reject(err);
                });
              }

              conn.query(
                `INSERT INTO finnish (word) VALUES (?)`,
                word[1],
                (err) => {
                  if (err) {
                    return conn.rollback(() => {
                      reject(err);
                    });
                  }

                  conn.query(
                    `INSERT INTO swedish (word) VALUES (?)`,
                    word[2],
                    (err) => {
                      if (err) {
                        return conn.rollback(() => {
                          reject(err);
                        });
                      }

                      conn.commit((err, response) => {
                        if (err) {
                          return conn.rollback(() => {
                            reject(err);
                          });
                        }
                        console.log(response);
                        resolve(`Posted word successfully!`);
                      });
                    }
                  );
                }
              );
            }
          );
        });
      });
    });
  },
};
module.exports = connectionFuncs;
