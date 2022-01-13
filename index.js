const express = require("express");
const app = express();
const connection = require("./db.js");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

app.get("/api/:category", async (req, res) => {
  let category = req.params.category;
  try {
    let data = await connection.getAll(category);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.get("/api/:category/:language", async (req, res) => {
  console.log(req.params);
  let category = req.params.category;
  let language = req.params.language;
  try {
    let data = await connection.getByLanguage(language, category);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.get("/api/:category/id/:id", async (req, res) => {
  let category = req.params.category;
  let id = req.params.id;
  try {
    let data = await connection.getById(id, category);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.post("/api/:category", async (req, res) => {
  let category = req.params.category;
  let word = req.body;
  try {
    let insertId = await connection.postWord(word, category);
    res.statusCode = 201;
    res.send({
      id: insertId,
      english: word[0],
      finnish: word[1],
      swedish: word[2],
    });
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.delete("/api/:category/:id", async (req, res) => {
  let category = req.params.category;
  let id = req.params.id;
  try {
    let result = await connection.deleteWord(id, category);
    res.statusCode = 200;
    res.send(result);
    res.end();
  } catch (err) {
    console.log(err);
    if (err == "Id not found") {
      res.statusCode = 404;
      res.end();
    }
  }
});
app.put("/api/:category/:id", async (req, res) => {
  let id = req.params.id;
  let word = req.body;
  try {
    await connection.editWord(id, word, category);
    res.statusCode = 200;
    res.send({
      id: id,
      english: word[0],
      finnish: word[1],
      swedish: word[2],
    });
    res.end();
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
