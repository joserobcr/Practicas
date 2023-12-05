const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const { default: jsPDF } = require('jspdf');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const multer = require('multer');
const upload = multer();

app.get('/canciones', async (req, res) => {
    if (!req.query.Top) {
        return res.status(400).json({ error: "Parámetro 'Top' faltante en la consulta" });
    }

    if (isNaN(req.query.Top)) {
        return res.status(400).json({ error: "El valor de 'Top' debe ser un número" });
    }

    const topValue = Number(req.query.Top);

    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const [rows, fields] = await connection.execute('SELECT * FROM canciones WHERE Top = ?', [topValue]);
        
        await connection.end();
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

app.delete('/canciones', async (req, res) => {
    if (!req.query.Top) {
        return res.status(400).json({ error: "Parámetro 'Top' faltante en la consulta" });
    }

    if (isNaN(req.query.Top)) {
        return res.status(400).json({ error: "El valor de 'Top' debe ser un número" });
    }

    const topValue = Number(req.query.Top);

    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const deleteQuery = 'DELETE FROM canciones WHERE Top = ?';
        const [result] = await connection.execute(deleteQuery, [topValue]);

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 0, mensaje: "El Top especificado no existe." });
        }

        return res.status(200).json({ status: 1, mensaje: "Top eliminado exitosamente." });
    } catch (error) {
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

app.post('/canciones', async (req, res) => {
    const { nombre, artistas, duracion } = req.body;

    if (!nombre.trim() || !artistas.trim() || !duracion.trim()) {
        return res.status(400).json({ error: "Todos los campos son obligatorios: nombre, artistas y duracion." });
    }

    if (isNaN(duracion)) {
        return res.status(400).json({ error: "La duración debe ser un número." });
    }

    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const [result] = await connection.execute(
            `INSERT INTO canciones (nombre, artistas, duracion) VALUES (?, ?, ?)`,
            [nombre, artistas, duracion]
        );

        await connection.end();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar la canción." });
    }
});

app.put('/canciones', async (req, res) => {
    try {
        if (!req.query.Top || isNaN(req.query.Top) || !req.query.nombre || !req.query.artistas || !req.query.duracion) {
            return res.status(400).json({ error: "Completa todos los campos y asegúrate de que 'Top' sea un número" });
        }

        const topValue = Number(req.query.Top);
        const nombre = req.query.nombre;
        const artistas = req.query.artistas;
        const duracion = req.query.duracion;

        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const updateQuery = 'UPDATE canciones SET nombre = ?, artistas = ?, duracion = ? WHERE Top = ?';
        const [result] = await connection.execute(updateQuery, [nombre, artistas, duracion, topValue]);

        await connection.end();

        if (result.affectedRows === 1) {
            return res.status(200).json({ status: 1, mensaje: "Canción modificada exitosamente", datos: {} });
        } else {
            return res.status(404).json({ status: 0, mensaje: "El Top especificado no existe o no se pudo actualizar la canción", datos: {} });
        }
    } catch (error) {
        return res.status(500).json({ error: "Error al procesar la solicitud", datos: {} });
    }   
});

app.post('/canciones/formato', upload.none(), (req, res) => {
    const doc = new jsPDF();
    doc.text(`Cancion:`, 10, 10);
    doc.text(`Top: ${req.body.Top}`, 10, 20);
    doc.text(`nombre: ${req.body.nombre}`, 10, 30);
    doc.text(`artistas: ${req.body.artistas}`, 10, 40);
    doc.text(`duracion: ${req.body.duracion}`, 10, 50);
    let archivoPDF = path.join(__dirname, 'Archivo.pdf');
    doc.save(archivoPDF);
    res.sendFile(archivoPDF);
});

app.listen(8080,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8080")
});
