import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const RDS_DB_IDENTIFIER = process.env.RDS_DB_IDENTIFIER;
const RDS_USER_NAME = process.env.RDS_USER_NAME;
const RDS_USER_PASSWORD = process.env.RDS_USER_PASSWORD;

let connection = mysql.createConnection({
  host: "cococal-mysql.cxpazwtm0zdn.ap-northeast-3.rds.amazonaws.com",
  user: RDS_USER_NAME,
  password: RDS_USER_PASSWORD,
  database: "msgBoardDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// export async function createTable() {
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");

//     // 新增資料表
//     let createTable_sql =
//       "CREATE TABLE message (id INT PRIMARY KEY AUTO_INCREMENT,comment VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL)";
//     connection.query(createTable_sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//       return "Table created";
//     });
//   });
// }

export async function addData(comment, image) {
  //   connection.connect((err) => {
  //     if (err) throw err;
  //     console.log("Connected!");

  // 新增留言
  let createMessage_sql = "INSERT INTO message (comment, image) VALUES ?";
  // (?,?)
  let createMessage_values = [[comment, image]];
  connection.query(
    createMessage_sql,
    [createMessage_values],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      return "1 record inserted";
    }
  );
  //   });
}

// 查詢留言
export async function readData() {
  //   connection.connect((err) => {
  //     if (err) throw err;
  //     console.log("Connected!");

  // 查詢留言
  let read_sql = "SELECT * FROM message";
  let data = await new Promise((resolve, reject) => {
    connection.query(read_sql, function (err, result) {
      if (err) throw err;
      // console.log(result);
      else {
        return resolve(result);
      }
    });
  });
  return data;
}
