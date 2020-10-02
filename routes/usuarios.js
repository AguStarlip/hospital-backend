/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, getUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarAdminRole, validarAdminRole_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().notEmpty(),
        check('password', 'La contraseña es obligatoria').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);
router.put('/:id', [
        validarJWT,
        validarAdminRole_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().notEmpty(),
        validarCampos
    ],
    actualizarUsuario
);
router.delete('/:id', [validarJWT, validarAdminRole], borrarUsuario);




module.exports = router;