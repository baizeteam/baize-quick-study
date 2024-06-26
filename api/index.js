// 由于vercel部署的原因，好像无法放置在跟目录下，暂时放在api文件夹下

const express = require("express");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "..", "dist")));

app.get("/main*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "main"));
});

app.get("/react*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "react"));
});

app.get("/vue3*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "vue3"));
});

app.get("/apiReact/*", (req, res)=>{
  res.json({
    code: 200,
    message: "请求成功！",
    data: {
      name: "baize-team",
      type: "来自React中模拟的数据",
      projectName: "baize-quick-study",
      desc: "为各位有React或者Vue基础的同学，快速学习未掌握的React或者Vue框架",
    },
  })
})

app.get("/apiVue/*", (req, res)=>{
  res.json({
    code: 200,
    message: "请求成功！",
    data: {
      name: "baize-team",
      type: "来自Vue中模拟的数据",
      projectName: "baize-quick-study",
      desc: "为各位有React或者Vue基础的同学，快速学习未掌握的React或者Vue框架",
    },
  })
})

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "main", "index.html"));
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "";

app.server = app.listen(port, host, () => {
  console.log(`server running http://${host ? host : "localhost"}:${port}`);
});
