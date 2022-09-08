const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port= process.env.port;
        this.usuariosRoutePath='/api/usuarios';

        //middlewareas
        this.middlewarea(); 

        this.routes();
        
    }

    middlewarea(){

        this.app.use(cors());

        // parseo y lectura del body
        this.app.use(express.json());

        //directorito publico
        this.app.use(express.static('public'));

    }

    routes(){  
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'))
    }


    listen(){
        
       this. app.listen(this.port,()=>{
         console.log(`Example app listening at http://localhost:${this.port}`)
  })
    }

}


module.exports=Server;