/* 
    Ruta: '/api/medicos'
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { check } = require('express-validator');


const router = Router();

router.get('/', getMedicos);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().notEmpty(),
        check('hospital', 'El id del hospital debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().notEmpty(),
        check('hospital', 'El id del hospital debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);
router.delete('/:id', validarJWT, borrarMedico);




module.exports = router;