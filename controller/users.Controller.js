//Este archivo maneja las solicitudes HTTP y usa el modelo User para interactuar con la base de datos.
//javascript
// Copiar
// Editar


const User = require("../models/user.model"); // Importa el modelo de usuario

module.exports = {
  // Método para registrar un usuario
  register(req, res) {
    const user = req.body; // Capturo los datos enviados en la solicitud (POST)

    // Llamo al método `create` del modelo `User` para insertar en la base de datos
    User.create(user, (err, data) => {
      if (err) {
        console.error("❌ Error detallado:", err); // Para ver el error real en consola

return res.status(501).json({
  success: false,
  message: "Hubo un error con el registro del usuario",
  error: {
    message: err.message,
    code: err.code,
    fatal: err.fatal
  },
});

      }
      
      // Si todo sale bien, retorno una respuesta con éxito
      return res.status(201).json({
        success: true,
        message: "El registro se realizó correctamente",
        data: data, // Aquí se devuelve el ID del nuevo usuario
      });
    });
  },
};
