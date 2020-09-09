require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear Servidor
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));





app.listen(process.env.PORT, () => {
    console.log('Servidor online en puerto ' + process.env.PORT);
});