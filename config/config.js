
const mysql = require("mysql2");
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
        console.error("Error al conectar a MySQL:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos ✅");
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;
