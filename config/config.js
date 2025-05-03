
const mysql = require("mysql2");

// Configuración de la conexión
const db = mysql.createConnection({
    host: "localhost",      // Cambia esto si usas otro servidor
    user: "root",           // Usuario de la BD
    password: "123456",           // Contraseña (déjalo vacío si no tienes)
    database: "delivery_app" // Nombre de tu BD
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
