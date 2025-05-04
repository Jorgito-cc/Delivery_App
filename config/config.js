const mysql = require("mysql2");
require("dotenv").config(); // IMPORTANTE: leer .env aquí también por si se usa config de forma aislada

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err.message);
    return;
  }
  console.log("✅ Conexión exitosa a la base de datos");
});

module.exports = db;
