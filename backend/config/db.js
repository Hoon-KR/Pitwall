// backend/config/db.js
require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  // 'YOUR_PASSWORD' 대신 process.env.DB_PASSWORD 사용
  password: process.env.DB_PASSWORD,
  database: "pitwall_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
