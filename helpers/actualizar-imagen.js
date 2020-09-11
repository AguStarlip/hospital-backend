const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const fs = require('fs');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe un medico con el id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe un hospital con el id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe un usuario con el id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        default:
            break;
    }

}



module.exports = {
    actualizarImagen
}