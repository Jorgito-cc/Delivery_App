//Este archivo maneja la conexión con la base de datos y define las operaciones relacionadas con los usuarios.

const db = require('../config/config'); // Importa la conexión a la base de datos

// Creo un objeto User que contendrá los métodos para interactuar con la base de datos
const User = {};

// Método para crear un usuario en la base de datos
User.create = (user, result) => {
    const sql = `
        INSERT INTO users (
            email,
            name,
            lastname,
            phone,
            password,
            image,
            created_at,
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    // Defino los valores que se insertarán en la consulta SQL
    const values = [
        user.email,   // Correo del usuario
        user.name,    // Nombre
        user.lastname,// Apellido
        user.phone,   // Teléfono
        user.password,// Contraseña (sin hashear, en producción se debe encriptar)
        user.image ,
        new Date(),   // Fecha de creación
        new Date()    // Fecha de actualización
    ];

    // Ejecuto la consulta SQL para insertar el usuario
    db.query(sql, values, (err, res) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            result(err, null); // Si hay error, lo enviamos al callback
            return;
        }
        console.log('Usuario creado con ID:', res.insertId);
        result(null, res.insertId); // Retorno el ID del usuario creado
    });
};

// Exporto el objeto User para que pueda ser usado en otros archivos
module.exports = User;

