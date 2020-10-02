const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    // Leer Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'El token no existe'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

const validarAdminRole = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (usuarioDB.rol !== 'ADMIN_ROLE') {
            res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar está accion'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const validarAdminRole_MismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (usuarioDB.rol === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar está accion'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}


module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_MismoUsuario
}