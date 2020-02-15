const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const verificarToken  = require('../jwt/verificar');
/**
 * Consulta todos los Vehiculo
 */
app.get('/vehiculo', (req, res) => {
    // Abrir el cliente
    MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
        function (err, db) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                });
            }
            var collection = db.db("appnode").collection('Vehiculo');
            collection.find().toArray(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }
                res.status(200).json({
                    error: false,
                    vehiculos: result
                });
                // Cerrar el cliente
                db.close();
            });
        });   

});

/**
 * Elimina un Vehiculo por Id
 */
app.delete('/vehiculo/:id', verificarToken, function (req, res) {
    try {
        var IDvehiculo = require('mongodb').ObjectID(req.params.id);
        // Abrir el cliente
        MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
            function (err, db) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                    });
                }
                var collection = db.db("appnode").collection('Vehiculo');
                collection.remove({ _id: IDvehiculo }, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mensaje: err
                        });
                    }
                    res.status(200).json({
                        error: false,
                        mensaje: 'Vehiculo borrado exitosamente.'
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
 * Consulta un Vehiculo por id
 */
app.get('/vehiculo/:id', verificarToken, function (req, res) {
    try {
        var IDvehiculo = require('mongodb').ObjectID(req.params.id);
        // Abrir el cliente
        MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
            function (err, db) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                    });
                }
                var collection = db.db("appnode").collection('Vehiculo');
                collection.find({ _id: IDvehiculo }).toArray(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mensaje: err
                        });
                    }
                    res.status(200).json({
                        error: false,
                        vehiculo: result
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
 * Inserta un Vehiculo
 */
app.post('/vehiculo', verificarToken, function (req, res) {
    // Abrir el cliente
    MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
        function (err, db) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                });
            }
            var vehiculo = {
                marca: req.body.marca,
                modelo: req.body.modelo,
                precio: req.body.precio,
                color: req.body.color,
                anio: req.body.anio,
                urlImagen: req.body.urlImagen
            }
            var collection = db.db("appnode").collection('Vehiculo');
            collection.insert(vehiculo, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }
                res.status(201).json({
                    error: false,
                    vehiculo: result,
                    mensaje: 'Vehiculo insertado exitosamente.'
                });
                // Cerrar el cliente
                db.close();
            });
        });
})


/**
 * Modificar un Vehiculo por Id
 */
app.put('/Vehiculo/:id', function (req, res) {
    try {
        var vehiculo = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            precio: req.body.precio,
            color: req.body.color,
            anio: req.body.anio,
            urlImagen: req.body.urlImagen
        }
        var IDvehiculo = require('mongodb').ObjectID(req.params.id);
        // Abrir el cliente
        MongoClient.connect('mongodb+srv://diego:oGAjHhVk2sXthtLq@cluster0-eikjc.mongodb.net/appnode',
            function (err, db) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: 'Ha ocurrido un problema al conectar a la base de datos.'
                    });
                }
                var collection = db.db("appnode").collection('Vehiculo');
                collection.update({ "_id": IDvehiculo }, { $set: vehiculo }, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mensaje: err
                        });
                    }
                    res.status(200).json({
                        error: false,
                        vehiculo: result,
                        mensaje: 'Vehículo modificado exitosamente.'
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


module.exports = app;
