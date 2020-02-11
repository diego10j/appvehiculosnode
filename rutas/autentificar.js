const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const app = express();

app.post('/autentificar', (req, res) => {
    //Recupera correo y contraseña enviada
    let correo = req.body.correo;
    let clave = req.body.clave;
    // Abrir el cliente
    MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
        function (errdb, db) {
            if (errdb) {
                return res.status(500).json({
                    error: true,
                    mensaje: 'Ha ocurrido un problema al conectar a la base de datos'
                });
            }
            //Busca el usuario por el correo
            var collection = db.db("appnode").collection('Usuario');
            collection.find({ correo: correo }).toArray(function (err, usuario) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }
                if (!usuario[0]) {
                    return res.status(400).json({
                        error: true,
                        mensaje: 'El usuario no existe'
                    });
                }
                if (clave != usuario[0].clave) {
                    return res.status(400).json({
                        error: true,
                        mensaje: 'La contraseña es incorrecta'
                    });
                }
                //Genera token
                //Expira en 24 horas
                const CADUCIDAD_TOKEN = 60 * 60 * 24;
                //SEED de autenticación    
                const SEED = 'este-es-el-seed-de-la-actividad';
                let token = jwt.sign({
                    usuario: usuario[0]
                }, SEED, { expiresIn: CADUCIDAD_TOKEN });

                res.status(200).json({
                    error: false,
                    usuario: usuario[0],
                    token: token
                });
                // Cerrar el cliente
                db.close();
            });
        });
});

module.exports = app;