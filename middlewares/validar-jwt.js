const jwt = require('jsonwebtoken');


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




module.exports = {
    validarJWT
}