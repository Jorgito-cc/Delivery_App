const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Definir el puerto
const port = process.env.PORT || 3000;
app.set('port', port);

// Middlewares (deben ir antes de las rutas)
app.use(logger('dev')); // Log de peticiones
app.use(express.json()); // Habilitar JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Soporte para datos en formularios
app.use(cors(
    {
  origin: '*', // O mejor, especifica la IP de tu Flutter si quieres más seguro
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
)); // Habilitar CORS

// Rutas
const userRoutes = require("./routes/user.Routes"); // Importo las rutas
app.use("/api/users", userRoutes); // Uso las rutas en la API

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Ruta para raíz backend');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.stack);
});

// Iniciar servidor
app.listen(port,'0.0.0.0', () => {
    console.log(`Server running at http://192.168.0.7:${port}`);
  });
  
