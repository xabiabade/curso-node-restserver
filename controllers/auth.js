const bcryptjs = require('bcryptjs');
const {response}=require('express');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario=require('../models/usuario');





const login = async(req,res=response) =>{
const {correo, password}=req.body;


try {

    const usuario = await Usuario.findOne({correo});
    if (!usuario){
        return res.status(400).json({
            msg:'contraseña mala-correo'
        });
    }
    if (!usuario.estado){
        return res.status(400).json({
            msg:'estado-falso'
        });
    }
    
    const validPassword = bcryptjs.compareSync(password,usuario.password);
    if (!validPassword){
        return res.status(400).json({
            msg:'passs malo'
        });
    }


    const token = await generarJWT(usuario.id);
        res.json({
        usuario,
        token
    });

} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:'todo va mal'
    });
}


}


module.exports={
    login
}