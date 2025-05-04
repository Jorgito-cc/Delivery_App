const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
require('dotenv').config({ path: '.env.railway' });

// Definir el puerto fijo
const port = process.env.PORT || 3000;

app.set('port', port);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // puedes restringir esto según IP o dominio del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
const userRoutes = require("./routes/user.Routes");
app.use("/api/users", userRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Ruta para raíz backend');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

// Iniciar servidor en puerto 3000
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
