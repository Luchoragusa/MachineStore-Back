require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {json} = require('body-parser');
const app = express();

//Requerir router
const router = require('./routes/index.routes');


//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.use(json());

//Rutas
app.use('/', router);

// Ruta publica
app.use(express.static('./images/users'));
app.use(express.static('./images/games'));

app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})


module.exports = app;