const express = require("express");
const app = express();

app.use(express.static("public"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 可省略副檔名 "index.ejs" -> "index"
app.set("view engine", "ejs");

//HTTP request GET,POST,PUT,DELETE

// app.METHOD(PATH,HANDLER(request,response))，從req拿到資訊，用res做出回應
app.get("s3url", (req, res) => {});

app.get("/", function (req, res) {
  // res.status(200).json({ message: "error" });
  // res.sendFile(__dirname + "/index.html");
  res.render("index");
});

// 404 NOT FOUND
app.get("*", function (req, res) {
  res.send("NOT FOUND");
});

// app.listen(port,callback)
app.listen(3000, function () {
  console.log("伺服器已經啟動在port=3000，網址：http://127.0.0.1:3000/"); // 成功啟動後顯示在終端機的文字
});