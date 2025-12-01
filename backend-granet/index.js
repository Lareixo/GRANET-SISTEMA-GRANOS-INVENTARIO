// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express();
const port = 3000; //puerto del servidor 

//middleware 
app.use(cors()); 
app.use(bodyParser.json()); 

// PROVEEDORES

// GET: Obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
    const sql = 'SELECT * FROM proveedores';
    db.query(sql, (err, results) => {
        if (err) {
             res.status(500).send(err); 
        } else {
             res.json(results);
        }
    });
});

// POST: Guardar un nuevo proveedor
app.post('/api/proveedores', (req, res) => {
    const { nombre, email, telefono } = req.body;
    const sql = 'INSERT INTO proveedores (nombre, email, telefono) VALUES (?, ?, ?)';
    
    db.query(sql, [nombre, email, telefono], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Proveedor creado', id: result.insertId });
        }
    });
});

// GRANOS

// GET: Obtener granos
app.get('/api/granos', (req, res) => {
    // Usamos JOIN para traer el nombre del proveedor y no solo su ID
    const sql = `
        SELECT g.*, p.nombre as nombre_proveedor 
        FROM granos g 
        LEFT JOIN proveedores p ON g.id_proveedor = p.id_proveedor
    `;
    db.query(sql, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// POST: Guardar nuevo grano
app.post('/api/granos', (req, res) => {
    const { nombre, tipo, id_proveedor } = req.body;
    const sql = 'INSERT INTO granos (nombre, tipo, id_proveedor) VALUES (?, ?, ?)';
    
    db.query(sql, [nombre, tipo, id_proveedor], (err, result) => {
        if (err) res.status(500).send(err);
        else res.json({ message: 'Grano creado', id: result.insertId });
    });
});

// INVENTARIOS

// GET: Obtener inventario
app.get('/api/inventarios', (req, res) => {
    const sql = `
        SELECT i.*, g.nombre as nombre_grano 
        FROM inventarios i 
        JOIN granos g ON i.id_grano = g.id_grano
    `;
    db.query(sql, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// POST: Agregar inventario
app.post('/api/inventarios', (req, res) => {
    const { id_grano, cantidad, fecha_ingreso, precio_unitario } = req.body;
    const sql = 'INSERT INTO inventarios (id_grano, cantidad, fecha_ingreso, precio_unitario) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [id_grano, cantidad, fecha_ingreso, precio_unitario], (err, result) => {
        if (err) res.status(500).send(err);
        else res.json({ message: 'Inventario registrado', id: result.insertId });
    });
});

// Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor corridnedo en http://localhost:${port}`);
});