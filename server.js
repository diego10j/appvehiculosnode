const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Rutas de la aplicación
//app.use(require('./rutas/vehiculo'));
//app.use(require('./rutas/marca'));
//app.use(require('./rutas/usuario'));
app.use(require('./rutas/autentificar'));

app.listen(port, function () {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});


