const express = require ("express");
const app= express();
const mysql = require("mysql2");
const cors = cors('cors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

app.get('/usuarios',(req,res)=>{
    console.log(req.query.idUsuario);

    let consulta=''
    if(typeof(req.query.idUsuario)=='undefined')
    {
        consulta='select * from usuario'
    }
    else{
        consulta='select * from usuario where idUsuario'
    }
    console.log(consulta);
    connection.query(
        'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
        function(err, results, fields) {
          if(results.length==0)
          {
            res.json(results);
          }else{
            res.json(results);
          }
        
          res.json(results);
        }
      );
})

app.use(cors());

app.get('/',(req,res)=>{
    res.json({ mensaje: "Server Express respondiendo a get" });
});

app.post('/',(req,res)=>{
    resizeTo.json({ mensaje: "Server Express respondiendo a post" });
});

app.delete('/', (req,res)=>{
    resizeTo.json({mensaje:"Server express respondiendo a delete"});
})

app.listen(8082, ()=>{
    console.log("Servidor Express en puerto 8082")
})