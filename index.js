require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
const router = require("./router");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router());
app.get("/", (req, res) => {
  res.send({
    message: "URL hit successfull",
  });
});

app.get("*", (req, res) => {
  res.send("You might have misspelled url");
});

app.listen(7991 || process.env.PORT, () => {
  console.log("app is running on 7991 port");
});
