/* 
    Ruta: /api/todo/:
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocCollecion } = require('../controllers/busquedas');


const router = Router();

router.get('/:termino', validarJWT, getTodo);
router.get('/coleccion/:tabla/:termino', validarJWT, getDocCollecion);




module.exports = router;