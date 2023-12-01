const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connection = mysql2.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password:'neymar2003',
    database: 'Canciones'
})
connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
})

app.get('/canciones', async (req,res)=>{
    const connection=await mysql.createConnection({host: 'localhost',port:'3306',user: 'root',password:'neymar2003',database: 'Canciones'});
    const [rows, fields]= await connection.execute('Select * from `canciones` where Top=${req.query.Top}');
    res.json(rows);
})

/*app.get('/canciones',(req,res)=>{
    console.log(req.query.Top);

    let consulta=''
    if(typeof(req.query.Top)==='undefined')
    {
        consulta='select * from canciones'
    }
    else{
        consulta=`select * from canciones where Top=${req.query.Top}`
    }
    console.log(consulta)

    connection.query(
        consulta,
        function(err, results, fields){
            if(results.length==0)
          {
            res.json({
                status:0,
                mensaje: "Top no existe",
                datos:{}
            });
          }else{
            res.json({
                status:1,
                mensaje: "Usuario encontrado",
                datos:(results.lenght==1) ? results[0]:results
            });
          }
        }
    )
});*/

app.delete('/canciones', (req, res) => {
    const topToDelete = req.query.Top;

    let consulta = `SELECT * FROM canciones WHERE Top = ${topToDelete}`;

    connection.query(consulta, (error, resultados) => {
        if (error) {
            res.status(500).json({ status: 0, mensaje: "Error al buscar el Top." });
        } else {
            if (resultados.length === 0) {
                res.status(404).json({ status: 0, mensaje: "El Top especificado no existe." });
            } else {
                let deleteQuery = `DELETE FROM canciones WHERE Top = ${topToDelete}`;
                connection.query(deleteQuery, (err, result) => {
                    if (err) {
                        res.status(500).json({ status: 0, mensaje: "Error al eliminar el Top." });
                    } else {
                        res.status(200).json({ status: 1, mensaje: "Top eliminado exitosamente." });
                    }
                });
            }
        }
    });
});

app.post('/canciones', (req, res) => {
    const { Top, nombre, artistas, duracion } = req.body;

    const consulta = 'INSERT INTO canciones (Top, nombre, artistas, duracion) VALUES (?, ?, ?, ?)';
    connection.query(consulta, [Top, nombre, artistas, duracion], (err, results, fields) => {
        if (err) {
            console.error('Error al insertar:', err);
            res.status(500).json({ status: 0, mensaje: 'Error al insertar en la base de datos' });
        } else {
            res.json({ status: 1, mensaje: 'Registro insertado exitosamente' });
        }
    });
});

app.patch('/canciones', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a patch"});
});

app.listen(8085,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8085")
});
