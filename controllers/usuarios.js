const { response } = require('express');
const { request } = require('express');
const { } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
//const usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)

    ]);
    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //hash al pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();


    res.json(usuario);
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    //validar
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'put API',
        id
    });
}
const usuariosDelete = async(req, res) => {
const {id}=req.params;

//const usuario = await Usuario.findByIdAndDelete(id);

const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        id
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}