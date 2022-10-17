
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators');


const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
}=require('../middlewares')


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
   // esAdminRole,---> solo vale para  admin
    tieneRole('ADMIN_ROLE','USER_ROLE'),//--->permite varios roles
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],
usuariosDelete);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost);



module.exports ={
router
} 

