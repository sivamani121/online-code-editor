const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "sql6.freemysqlhosting.net", // Change if your MySQL server is hosted elsewhere
  user: "sql6692722",
  password: "fdmNp4tfhV",
  database: "sql6692722",
});

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL: " + err.stack);
      return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
  });
  
  // SQL query to create 'codes' table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS codes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(500),
      language VARCHAR(100),
      stdin VARCHAR(100),
      code TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  // Execute SQL query to create table
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }
    console.log('Table "codes" created successfully');
  });
  
module.exports.connection = connection;
exports.addRow = async function (req, res, next) {
  const newRow = {
    username: req.body.username,
    language: req.body.language,
    code: req.body.code,
  };

  connection.query("INSERT INTO codes SET ?", newRow, (err, results) => {
    if (err) {
      console.error("Error adding row: " + err.stack);
      return;
    }
    console.log("Row added successfully");
    res.status(200).json({
      msg: "code saved.",
    });
  });

//   next();
};
exports.retrieveRows = function (req, res, next) {
  connection.query("SELECT * FROM codes", (err, results) => {
    if (err) {
      console.error("Error retrieving rows: " + err.stack);
      return;
    }
    console.log("Retrieved rows:");
    console.log(results);
    // res.status(200).json({
    //     stdout: base64.decode(response1.data.stdout),
    //   });
  });
//   next();
};
