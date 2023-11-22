const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();

app.use(cors());

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

app.get('/canciones',(req,res)=>{//consulta en el diagonal el nombre de la tabla
    console.log(req.query.idAlumnos);

    let consulta=''
    if(typeof(req.query.idAlumnos)==='undefined')
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
            //console.log(results);
            //console.log(fields);

            //console.log(results);//array de objetos
            if(results.length==0)
          {
            res.json({mensaje:"Top no existe"});
          }else{
            res.json(results);
          }
        
        }
    )
});

app.post('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a post"});
});

app.delete('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a delete"});
});

app.listen(8085,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8085")
});
