const express = require("express");
const app = express();
const connection = require("./db.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));
