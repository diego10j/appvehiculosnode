const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

/**
 * Consulta todos los usuarios
 */
app.get('/usuario', function (req, res) {
    // Abrir el cliente
    MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
        function (err, db) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                });
            }
            var collection = db.db("appnode").collection('Usuario');
            collection.find().toArray(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }
                res.status(200).json({
                    error: false,
                    usuarios: result[0]
                });
                // Cerrar el cliente
                db.close();
            });
        });
})

/**
 * Elimina un Usuario por Id
 */
app.delete('/usuario/:id', function (req, res) {
    try {
        var IDusuario = require('mongodb').ObjectID(req.params.id);
        // Abrir el cliente
        MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
            function (err, db) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                    });
                }
                var collection = db.db("appnode").collection('Usuario');
                collection.remove({ _id: IDusuario }, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mensaje: err
                        });
                    }
                    res.status(200).json({
                        error: false,
                        mensaje: 'Usuario borrado exitosamente.'
                    });
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch (err) {
        return res.status(500).json({
            error: true,
            mensaje: 'Id no válido.'
        });
    }
})

/**
 * Consulta un usuario por id
 */
app.get('/usuario/:id', function (req, res) {
    try {
        var IDusuario = require('mongodb').ObjectID(req.params.id);
        // Abrir el cliente
        MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
            function (err, db) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                    });
                }
                var collection = db.db("appnode").collection('Usuario');
                collection.find({ _id: IDusuario }).toArray(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mensaje: err
                        });
                    }
                    res.status(200).json({
                        error: false,
                        usuario: result
                    });
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch (err) {
        return res.status(500).json({
            error: true,
            mensaje: 'Id no válido.'
        });
    }
})

/**
 * Inserta un usuario
 */
app.post('/usuario', function (req, res) {
    // Abrir el cliente
    MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
        function (err, db) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                });
            }
            var usuario = {
                nombres: req.body.nombres,
                correo: req.body.correo,
                clave: req.body.clave
            }
            var collection = db.db("appnode").collection('Usuario');
            collection.insert(usuario, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }
                res.status(201).json({
                    error: false,
                    usuario: result,
                    mensaje: 'Usuario insertado exitosamente.'
                });
                // Cerrar el cliente
                db.close();
            });
        });
})

module.exports = app;