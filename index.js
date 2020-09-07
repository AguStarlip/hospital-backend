require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear Servidor
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        message: 'Hola Mundo'
    });

});


app.listen(process.env.PORT, () => {
    console.log('Servidor online en puerto ' + process.env.PORT);
});