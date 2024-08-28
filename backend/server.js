const express = require("express");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () => console.log(`port on ${port}`));
