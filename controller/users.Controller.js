//Este archivo maneja las solicitudes HTTP y usa el modelo User para interactuar con la base de datos.
//javascript
// Copiar
// Editar


const User = require("../models/user.model"); // Importa el modelo de usuario



//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports = {
  //metodo para iniciar secion 
  login(req, res) {
    // necesito el emial 
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, myUser) => {
        
        console.log('Error ', err);
        console.log('USUARIO ', myUser);

        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: err
            });
        }
          //myUser.length < 1 
        if (!myUser) {
            return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                success: false,
                message: 'El email no fue encontrado'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, myUser.password);

        if (isPasswordValid) {
            const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

            const data = {
                id: myUser.id,
                name: myUser.name,
                lastname: myUser.lastname,
                email: myUser.email,
                phone: myUser.phone,
                image: myUser.image,
                session_token: `JWT ${token}`
            }

            return res.status(201).json({
                success: true,
                message: 'El usuario fue autenticado',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        }
        else {
            return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                success: false,
                message: 'El password es incorrecto'
            });
        }

    });

},
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
      return res.status(200).json({
        success: true,
        message: "El registro se realizó correctamente",
        data: data, // Aquí se devuelve el ID del nuevo usuario
      });
    });
  },
};
