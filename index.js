require('dotenv').config({ path: '.env' }); // Cargar variables desde archivo

const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const db = require('./config/config'); // conexión a MySQL

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
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

// Conexión a la base de datos y luego levantar el servidor
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Conexión exitosa a la base de datos");

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
