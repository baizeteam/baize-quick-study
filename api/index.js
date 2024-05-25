// 由于vercel部署的原因，好像无法放置在跟目录下，暂时放在api文件夹下

const express = require("express");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "..", "dist")));

app.get("/main*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "main"));
});

app.get("/react*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "react", "index.html"));
});

app.get("/vue3*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "vue3", "index.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "main", "index.html"));
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "";

app.server = app.listen(port, host, () => {
  console.log(`server running http://${host ? host : "localhost"}:${port}`);
});
