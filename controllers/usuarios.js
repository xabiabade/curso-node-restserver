const { response } = require('express');
const { request } = require('express');
const {}=require('express');

const usuariosGet = (req=request, res= response)=> {
    const query= req.query;
    res.json({
        msg:'get API---control',
        query                      
    });
};

const usuariosPost=(req, res)=> {

    const {nombre,edad}= req.body;
    res.json({               
        msg:'put Post',
        nombre,
        edad                   
    });
    };

const usuariosPut=(req, res)=> {

    const id =req.params.id;
     res.json({               
         msg:'put API' ,  
         id               
    });
    }
    const usuariosDelete=(req, res)=> {
    res.json({           
        msg:'delete API'               
    });
    }

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}