// el user.routes.js el routes es la que se encargar de dispar las acciones 


const express = require("express");
const userController = require("../controller/users.Controller"); // Importa el controlador

const router = express.Router();

// Defino la ruta para registrar un usuario
router.post("/register", userController.register);

module.exports = router;
