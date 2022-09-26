const { request } = require('express');
const { response } = require('express');
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT =async(req=request,res=response,next) =>{

    const token=req.header('x-token');


    if (!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }
    try {

       const {uid} = jwt.verify(token, process.env.SECRETTOPRIVATEKEY);

       const usuario= await Usuario.findById(uid);
       if (!usuario){
           return res.status(401).json({
            msg:'token no valido - usuario no existe'
        })
       }
       if (!usuario.estado){ // estado = false
           return res.status(401).json({
               msg:'token no valido - usuario eliminado'
        })
       }


       req.usuario=usuario;
       next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


}


module.exports={
    validarJWT
}