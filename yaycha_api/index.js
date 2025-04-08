const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());

app.get("/info", (req, res) => {
  res.json({ msg: "Yaycha API" });
});

app.listen(8000, () => {
  console.log("Yaycha API started at 8000...");
});
