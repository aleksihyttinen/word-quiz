const express = require("express");
const app = express();
const connection = require("./db.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

app.get("/language/:language", async (req, res) => {
  let language = req.params.language;
  try {
    let data = await connection.getAll(language);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await connection.getById(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.post("/", async (req, res) => {
  let word = req.body;
  try {
    let insertId = await connection.postWord(word);
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
app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await connection.deleteWord(id);
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
app.put("/:id", async (req, res) => {
  let id = req.params.id;
  let word = req.body;
  try {
    await connection.editWord(id, word);
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
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
