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
  "CREATE TABLE `candidats` (`id` INT NOT NULL AUTO_INCREMENT,`full-name` varchar(255) NOT NULL,`project` varchar(255) NOT NULL,`email` varchar(255) NOT NULL,`residency-name` varchar(255) NOT NULL,`status` BOOLEAN NOT NULL,PRIMARY KEY (`id`));CREATE TABLE `openCall` (`id` INT NOT NULL AUTO_INCREMENT,`residency-name` varchar(255) NOT NULL,`gallery` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`status` BOOLEAN NOT NULL,PRIMARY KEY (`id`));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `candidats` and `openCall` was successful!");

    console.log("Closing...");
  });

  con.end();
});






