
const {Router}=require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/',usuariosGet);
router.put('/:id', usuariosPut );
router.delete('/',usuariosDelete);
router.post('/',usuariosPost);



module.exports=router;

