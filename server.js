import express from "express";
import { generateUploadURL } from "./s3.js";
import { addData, readData } from "./rds.js";
import mysql from "mysql";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const RDS_DB_IDENTIFIER = process.env.RDS_DB_IDENTIFIER;
const RDS_USER_NAME = process.env.RDS_USER_NAME;
const RDS_USER_PASSWORD = process.env.RDS_USER_PASSWORD;

app.use(express.static("public"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 可省略副檔名 "index.ejs" -> "index"
app.set("view engine", "ejs");

//HTTP request GET,POST,PUT,DELETE

app.get("/", function (req, res) {
  // res.status(200).json({ message: "error" });
  // res.sendFile(__dirname + "/index.html");
  res.render("index");
});

// app.METHOD(PATH,HANDLER(request,response))，從req拿到資訊，用res做出回應
app.get("/imgStorage", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.post("/database", async (req, res) => {
  let data = req.body;
  const comment = data.comment;
  const imageURL = data.imageURL;
  const result = await addData(comment, imageURL);
  res.send(result);
});

app.get("/read", async (req, res) => {
  const result = await readData();
  res.json(result);
});

// 404 NOT FOUND
app.get("*", function (req, res) {
  res.send("NOT FOUND");
});

// app.listen(port,callback)
app.listen(3000, function () {
  console.log("伺服器已經啟動在port=3000，網址：http://127.0.0.1:3000/"); // 成功啟動後顯示在終端機的文字
});
