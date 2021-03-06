const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        // Verificar email

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o Contraseña no validos'
            });
        }

        // Verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña no validos'
            });
        }

        // Generar JWT

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.rol)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const googleSignIn = async(req, res) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.rol)
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

const renewToken = async(req, res) => {

    const uid = req.uid;


    // Generar JWT
    const token = await generarJWT(uid);

    // Obtener usuario por uid
    const usuarioDB = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario: usuarioDB,
        menu: getMenuFrontEnd(usuarioDB.rol)
    });

}



module.exports = {
    login,
    googleSignIn,
    renewToken
}