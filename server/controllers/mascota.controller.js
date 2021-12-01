const Mascota = require('../models/mascota.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        const mascota = req.body;
        mascota.userId = payload.id;
        Mascota.create(mascota)
            .then(data => {
                Mascota.findById(data._id).populate('user', '-password')
                    .then(user => res.json({ ok: true, message: 'Se agregó la mascota', data: user }))
                    .catch(error => {
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar la mascota' });
                        }
                    });
            })
            .catch(error => {
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar la mascota' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar la mascota' });
    }
}

module.exports.edit = (req, resp) => {
    const mascota = req.body;
    Mascota.findOneAndUpdate({ _id: req.params.id }, mascota)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó la mascota', data: mascota }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar la mascota' })
            }
        });
}

module.exports.get = (req, res) => {
    Mascota.findById(req.params.id).populate('user', '-password')
        .then(data => res.status(200).json({ ok: true, message: 'Mascota', data: data }))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ ok: false, message: 'Error al obtener la mascota' })
        });
}

module.exports.list = (req, res) => {
    Mascota.find().populate('user', '-password')
        .then(data => res.status(200).json({ ok: true, message: 'Mascota', data: data }))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ ok: false, message: 'Error al obtener las mascotas' })
        });
}

module.exports.del = (req, res) => {
    Mascota.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  la mascota', data: data }))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ ok: false, message: 'Error al eliminar la mascota' })
        });
}