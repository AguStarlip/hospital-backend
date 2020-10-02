/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, getUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);
router.post('/', [
        /* validarJWT, */
        check('nombre', 'El nombre es obligatorio').not().notEmpty(),
        check('password', 'La contraseña es obligatoria').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().notEmpty(),
        validarCampos
    ],
    actualizarUsuario
);
router.delete('/:id', validarJWT, borrarUsuario);




module.exports = router;