const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');
const fs = require('fs');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser valido: medicos, usuarios, hospitales'
        });
    }

    // Validar que exista archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreSplit = file.name.split('.');
    const extArchivo = nombreSplit[nombreSplit.length - 1];

    // Validar extension
    const extValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extValidas.includes(extArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extension debe ser valida: png, jpg, jpeg, gif'
        });
    }

    // Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extArchivo}`;

    // Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar DB
        actualizarImagen(tipo, id, nombreArchivo);


        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/Image_not_available.jpg`);
        res.sendFile(pathImg);
    }




}



module.exports = {
    fileUpload,
    retornaImagen
}