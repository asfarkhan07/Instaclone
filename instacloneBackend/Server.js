const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());
require("./Connection/connect");

const cors = require("cors");
const router = require("./Router/route");
app.use(router);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home").status(200);
});

app.listen(port, (req, res) => {
  console.log(`App is running on ${port}`);
});
