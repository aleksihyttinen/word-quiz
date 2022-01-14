const express = require("express");
const app = express();
const connection = require("./db.js");
const cors = require("cors");
const path = require("path");

//Middleware
app.use(express.json()); //Parses post requests to json
app.use(cors()); //Handles cors policy
app.use(express.static("frontend/build")); //Uses frontend

app.get("/api", async (req, res) => {
  //Gets all categories available and returns them
  try {
    let data = await connection.getCategories();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.get("/api/:category", async (req, res) => {
  //Gets all words in a category and returns them
  let category = req.params.category;
  try {
    let data = await connection.getByCategory(category);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.get("/api/:category/:language", async (req, res) => {
  //Gets all words in a certain language from category and returns them
  let category = req.params.category;
  let language = req.params.language;
  try {
    let data = await connection.getByLanguage(language, category);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.get("/api/:category/id/:id", async (req, res) => {
  //Gets a word in all languages by id and returns them
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
  //Posts a new word and it's translations to a category
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
  //Deletes a word by id from a category
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
  //Edits a word by id from a category
  let category = req.params.category;
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
  //If url is anything else than the ones specified for backend, return frontend app
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  //Starts the server
  console.log(`Listening on port ${server.address().port}`);
});
