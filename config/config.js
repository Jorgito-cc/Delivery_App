const mysql = require("mysql2");
require('dotenv').config({ path: '.env' }); // Asegúrate que esto está aquí también si este archivo se usa solo

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306
});

module.exports = db;
