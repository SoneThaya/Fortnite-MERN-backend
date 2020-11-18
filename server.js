const express = require("express");
const items = require("./data/items");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.manifestId === Number(req.params.id));
  res.json(item);
});

app.listen(5000, console.log("server running on port 5000"));
