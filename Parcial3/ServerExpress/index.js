const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
//const { default: jsPDF } = require('jspdf');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const { jsPDF } = require('jspdf');

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

app.get('/canciones/formato', async(req,res)=>{
    const Top = req.body.Top || '';

    if (!Top) {
        return res.status(400).json({ error: "Parámetro 'Top' faltante en la consulta" });
    }

    if (isNaN(Top)) {
        return res.status(400).json({ error: "El valor de 'Top' debe ser un número" });
    }

    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const [rows, fields] = await connection.execute('SELECT * FROM canciones WHERE Top = ?', [Top]);
        
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: "La canción no fue encontrada" });
        }

        const doc = new jsPDF();
        doc.setFontSize(12);

        const nombre = rows[0].nombre || '';
        const artistas = rows[0].artistas || '';
        const duracion = rows[0].duracion || '';

        doc.text(`Canción:`, 10, 10);
        doc.text(`Top: ${Top}`, 10, 20);
        doc.text(`Nombre: ${nombre}`, 10, 30);
        doc.text(`Artistas: ${artistas}`, 10, 40);
        doc.text(`Duración: ${duracion}`, 10, 50);

        const filePath = path.join(__dirname, 'Cancion.pdf');
        doc.save(filePath);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
    
    /*const Top = req.query.Top || '';

    if (!Top) {
        return res.status(400).json({ error: "Parámetro 'Top' faltante en la consulta" });
    }

    if (isNaN(Top)) {
        return res.status(400).json({ error: "El valor de 'Top' debe ser un número" });
    }

    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'neymar2003',
            database: 'Canciones'
        });

        const [rows, fields] = await connection.execute('SELECT * FROM canciones WHERE Top = ?', [Top]);
        
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: "La canción no fue encontrada" });
        }

        const doc = new jsPDF();
        doc.setFontSize(12);

        const nombre = rows[0].nombre || '';
        const artistas = rows[0].artistas || '';
        const duracion = rows[0].duracion || '';

        doc.text(`Canción:`, 10, 10);
        doc.text(`Top: ${Top}`, 10, 20);
        doc.text(`Nombre: ${nombre}`, 10, 30);
        doc.text(`Artistas: ${artistas}`, 10, 40);
        doc.text(`Duración: ${duracion}`, 10, 50);

        const filePath = path.join(__dirname, 'Cancion.pdf');
        doc.save(filePath);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }*/
});

app.listen(8083,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8083")
});
