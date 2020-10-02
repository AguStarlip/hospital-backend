const { response } = require('express')
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });

}

const getMedicoId = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error inesperado...'
        });

    }


}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado...'
        });
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico borrado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}



module.exports = {
    getMedicos,
    getMedicoId,
    crearMedico,
    actualizarMedico,
    borrarMedico
}