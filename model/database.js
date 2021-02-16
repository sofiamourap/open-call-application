require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "residents",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
  "CREATE TABLE `candidats` (`id` INT AUTO_INCREMENT,`full_name` varchar(255),`project` varchar(255),`email` varchar(255),`residency_id` INT,`status` BOOLEAN,PRIMARY KEY (`id`));CREATE TABLE `openCall` (`id` INT  AUTO_INCREMENT,`residency_name` varchar(255),`gallery_id` INT,`description` varchar(255),`status` BOOLEAN, PRIMARY KEY (`id`));CREATE TABLE `gallery` (`id` INT AUTO_INCREMENT,`name` varchar(255),`country` varchar(255),`city` varchar(255),`open_calls` varchar(255),PRIMARY KEY (`id`));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `candidats`, `gallery` and `openCall` was successful!");

    console.log("Closing...");
  });

  con.end();
});






