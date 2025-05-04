require('dotenv').config({ path: '.env.railway' }); // <== MUY IMPORTANTE: al principio

const mysql = require("mysql2");

// Mostrar variables para confirmar que se están leyendo
console.log("📦 Variables de entorno:", {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar a MySQL:", err);
        return;
    }
    console.log("✅ Conexión exitosa a la base de datos");
});

module.exports = db;
