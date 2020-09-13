/* 
    Ruta: '/api/login'
*/

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().notEmpty(),
        validarCampos
    ],
    login
);

router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().notEmpty(),
        validarCampos
    ],
    googleSignIn
);





module.exports = router;