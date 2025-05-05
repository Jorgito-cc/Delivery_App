// Cargar variables del entorno desde .env
require('dotenv').config();

const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');


// 
const passport = require('passport') ;

// Inicialización
const app = express();
const server = http.createServer(app);

// Puerto desde .env o 3000 por defecto
const port = process.env.PORT || 3000;
app.set('port', port);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


// Rutas
const userRoutes = require('./routes/user.Routes');
app.use('/api/users', userRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Ruta para raíz backend');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

// Iniciar servidor
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
